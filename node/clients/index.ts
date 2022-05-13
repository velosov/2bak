import { IOClients } from '@vtex/api'
import { Catalog, OMS, Logistics } from '@vtex/clients'

import Status from './status'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get oms() {
    return this.getOrSet('OMS', OMS)
  }

  public get logistics() {
    return this.getOrSet('Logistics', Logistics)
  }
}
