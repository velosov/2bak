import type { ClientsConfig, ServiceContext, RecorderState, EventContext } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { catalog } from './middlewares/catalog'
import { listInventory } from './middlewares/logistics'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'

import { helloWorld } from './resolvers/helloWorld'
import { cancelRequested } from './handlers/cancelRequested'

const TIMEOUT_MS = 1000
const LARGE_TIMEOUT_MS = 3 * 1000
const CONCURRENCY = 10

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)


// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    events: {                             // refs: https://learn.vtex.com/docs/course-service-course-step03events-lang-en
      exponentialTimeoutCoefficient: 2,
      exponentialBackoffCoefficient: 2,
      initialBackoffDelay: 50,
      retries: 1,
      timeout: LARGE_TIMEOUT_MS,
      concurrency: CONCURRENCY,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}



declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }

  // The event context which will receive a body object like this; for more details, see https://github.com/vtex-apps/orders-feed-example
  interface OrderCancelled extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }
}


export default new Service({
  clients,
  events: {
    //all the status flow of orders: https://help.vtex.com/en/tutorial/fluxo-de-pedido/#understanding-the-status
    cancelRequested,
  },
  graphql: {
    resolvers: {
      Query:{
        helloWorld,
      }
    }
  },
  routes: {
    // `status, catalog, logistics` are the labels/route IDs from service.json. It maps to an array of middlewares (or a single handler).
    status: method({
      GET: [validate, status],
    }),
    catalog: method({
      GET: [catalog],
    }),
    logistics: method({
      GET: [listInventory]
    })
  },
})
