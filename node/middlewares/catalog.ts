// Middleware consuming the Catalog APIs made available by the client imported from @vtex/clients

export async function catalog(ctx: Context, next: () => Promise<any>) {
    // The code below destructures the catalog variable from the context (ctx) so that we do not need to keep writing ctx.clients.catalog
    const {
      clients: { catalog },
      vtex: { account } // only to show that this exists in the Context and can give you useful data
    } = ctx
  
    const prodsAndSKUs = await catalog.getProductsAndSkus(1,50)
    console.log(prodsAndSKUs)

    // then you can build some logic to capture each returned SKU's info by iterating over the following method:
    //const prodsAndSKUs = await catalog.getSkuContext(sku)
    
    console.log(account)

    ctx.body.catalogData = prodsAndSKUs // append the requested data into a 'body' prop in the Context, providing for following middlewares
  
    await next()
  }