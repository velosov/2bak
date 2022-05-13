import { UserInputError } from "@vtex/api"

export async function listInventory(ctx: Context, next: () => Promise<any>) {
    // 
    const {
      clients: { logistics },
      vtex: { 
          route: {
              params
            } 
        }
    } = ctx
  
    const { id } = params
    if (!id) {
        throw new UserInputError('Please provide the ID of the Order')
    } else {
    const SKUinventory = await logistics.listInventoryBySku(String(id)) //https://developers.vtex.com/vtex-rest-api/reference/inventorybysku

    ctx.body = SKUinventory
    ctx.status = 200

    await next()
    }
}