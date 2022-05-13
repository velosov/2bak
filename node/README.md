# IO Services 101

There are 3 ways to act: routes (REST APIs), GraphQL (the front-end's first pick) and Events.

As we're coding with TypeScript, node/ is our service's root directory. There we'll find another package.json and 2 important files: index.ts and service.json.

### Index.ts ~and service.json spoiler~

We use [**KoaJS**](https://koajs.com/) - taking a look might be useful - as the web framework. The minimum you need to know about: it's a kind of axios that allows our API to easily configurate some default details like retries, timeouts and caching options. Maybe also much more...

Below, we declare globally a Context type, which will be important because is the entity that will retrieve the information and be used to pass it through the data processing cascade.

Data processing cascade? Koa thinks of going from a _req_ to a _res_ as a sequence of operations on the received data. It means that you'll declare a _Service_ listing the sequence of middlewares to be applied under each method for each specified route - the last one in the other mentioned file, service.json. Naturally, every declared route in service.json must be called in index.ts > _exported new Service_.

![Service Example Architecture](https://user-images.githubusercontent.com/18706156/77381360-72489680-6d5c-11ea-9da8-f4f03b6c5f4c.jpg)

### Now we need to talk about the last members of the game: the Clients.

They have a so-important-as the middlewares status. They're the ones in charge of consuming the APIs.

Mainly, you'll declare a class that inherits the properties of one of the built-in clients from the [**node-vtex-api**](https://github.com/vtex/node-vtex-api) package, a VTEX set of utilities for Node services. Usually, that's JanusClient for consuming our internal APIs or ExternalClient for the outsiders, as in this example.
VTEX also offers another package, '@vtex/clients', with some pre-built Clients. The [Catalog](https://github.com/vtex/io-clients/blob/master/src/clients/catalog.ts) is one of them, and it comes with some methods that may ease our development. Whenever you need something more custom, you can go through the code and declare your own methods too.

Here we have a GraphQL API exposed being consumed by the Admin's component, one handler triggered by the event of a cancellation order that access its details in the Order Management System and 3 REST APIs: one accessing [this](httpstat.us) mock API to exemplify how to abstract requests to domains outsite VTEX infra; and two others consuming internal ones (catalog and logistics), calling 1 endpoint of each.

=======================================================================================================

### About Events hearing Orders:

[Orders Feed example](https://github.com/vtex-apps/orders-feed-example)
[Why to use the Feed instead of keep listing the Orders](https://developers.vtex.com/vtex-rest-api/docs/orders-feed)

### Configuring Giftcards
[Integration Guide](https://developers.vtex.com/vtex-rest-api/docs/gift-card-integration-guide)
[GitHub Protocol example](https://github.com/vtex-apps/giftcard-protocol-example)

### VTEX offers a GDPR-compliant Storage solution
Perfect for processing non-core-related data from customers that you don't want/need to host.
- MasterData v1 has an UI that you can access from the Admin Panel
- MasterData v2 is API-only and based on JSON Schemas, what gives more flexibility

You can directly access a Client to interact with it from the Context (ctx.clients.masterdata).

# The following is as described in @vtex-apps/service-example:

A reference app implementing a VTEX IO service with HTTP route handlers.

- Start from `node/index.ts` and follow the comments and imports :)

## Recipes

### Defining routes on _service.json_ 
```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "routes": {
    "status": {
      "path": "/_v/status/:code",
      "public": true
    }
  }
}
```

The `service.json` file that sits on the root of the `node` folder holds informations about this service, like the maximum timeout and number of replicas, what might be discontinued on the future, but also **sets its routes**. 

Koa uses the [path-to-regexp](https://github.com/pillarjs/path-to-regexp) format for defining routes and, as seen on the example, we use the `:code` notation for declaring a **route param** named code, in this case. A HTTP request for `https://{{workspace}}--{{account}}.myvtex.com/_v/status/500` will match the route we've defined. 

For each _key_ on the `routes` object, there should be a **corresponding entry** on the exported Service object on `node/index.ts`, this will hook your code to a specific route.

### Access Control
You can also provide a `public` option for each route. If `true`, that resource will be reachable for everyone on the internet. If `false`, VTEX credentials will be requested as well.

Another way of controlling access to specific routes is using **ReBACs (Resource-based access)**, that supports more robust configuration.

#### Query String
For `?accepting=query-string`, you **don't need to declare anything**, as any query provided to the URL will already be available for you to use on the code as `ctx.query`, already parsed as an object, or `ctx.queryString`, taken directly from the URL as a string.

#### Route Params
Route Params will be available for you to use on the code as `ctx.vtex.params`, already parsed as an object.
For a path like `/_v/status/:code`, if you receive the request `/_v/status/200`, `ctx.vtex.params` will return `{ code: '200' }`

#### HTTP methods
When you define a route on the `service.json`, your NodeJS handlers for that route will be triggered  **on every HTTP method** (GET, POST, PUT...), so, if you need to handle them separately you need to implement a "sub-router". Fortunately, the _node-vtex-api_ provides a helper function `method`, exported from `@vtex/api`, to accomplish that behaviour. Instead of passing your handlers directly to the corresponding route on `index.ts`, you pass a `method` call passing **an object with the desired method as key and one handler as its corresponding value**. Check this example:
```typescript
import { method } from '@vtex/api'
...

export default new Service<Clients, State>({
  clients,
  routes: {
    status: method({
      GET: statusGetHandler,
      POST: statusPostHandler,
    }),
  },
})
```

### Throwing errors

When building a HTTP service, we should follow HTTP rules regarding data types, cache, authorization, and status code. Our example app sets a `ctx.status` value that will be used as a HTTP status code return value, but often we also want to give proper information about errors as well.

The **node-vtex-api** already exports a handful of **custom error classes** that can be used for that purpose, like the `NotFoundError`. You just need to throw them inside one of the the route handlers that the appropriate response will be sent to the server.

```typescript
import { UserInputError } from '@vtex/api'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const { code } = ctx.vtex.route.params
  if (isNaN(code) || code < 100 || code > 600) {
    throw new UserInputError('Code must be a number between 100 and 600')
  }
...
```

You can check all the available errors [here](https://github.com/vtex/node-vtex-api/tree/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors), but some are not useful for just-HTTP services. Check the most useful ones:

|Error Class | HTTP Code |
|--|:--:|
| `UserInputError` | 400 |
| `AuthenticationError` | 401 |
| `ForbiddenError` | 403 |
| `NotFoundError` | 404 |

You can also **create your custom error**, just see how it's done above ;)

### Reading a JSON body

When writing POST or PUT handlers, for example, often you need to have access to the **request body** that comes as a JSON format, which is not provided directly by the handler function.

For this, you have to use the [co-body](https://www.npmjs.com/package/co-body) package that will parse the request into a readable JSON object, used as below: 
```typescript
import { json } from 'co-body'
export async function method(ctx: Context, next: () => Promise<any>) {
    const body = await json(ctx.req)
```


## Testing

`@vtex/test-tools` and `@types/jest` should be installed on `./node` package as `devDependencies`.

Run `vtex test` and [Jest](https://jestjs.io/) will do its thing.

Check the `node/__tests__/simple.test.ts` test case and also [Jest's Documentation](https://jestjs.io/docs/en/getting-started).

