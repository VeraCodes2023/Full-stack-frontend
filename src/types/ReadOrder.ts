interface OrderPurchaser
{
    id:string,
    name: string,
    email: string,
    role: string,
    avatar: string,
    addresses:{
      street: string,
      city: string,
      state: string,
      postalCode: string,
      country: string
    }[]
}

interface Item
{
    productId: string,
    productName: string,
    productPrice: number,
    quantity: number
}

interface Order{
    purchaseId:string,
    userId:string,
    user:OrderPurchaser,
    status:string,
    purchaseItems:Item[],
    createdAt:string
}

export default Order