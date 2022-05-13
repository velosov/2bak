import { UserInputError } from "@vtex/api"

export async function cancelRequested(ctx: OrderCancelled, next: () => Promise<any>) {
    const {
        body: { orderId, currentState },
        clients: { oms }
        } = ctx

        console.log(`New order cancelled with id ${orderId}. It's state: ${currentState}`)
        if (!orderId) {
            throw new UserInputError('Please provide the ID of the Order')
        } else {
    
        const orders = await oms.order(orderId) //https://developers.vtex.com/vtex-rest-api/reference/cancelorder
    
        console.log(orders)
        }
        
        await next()
    }
