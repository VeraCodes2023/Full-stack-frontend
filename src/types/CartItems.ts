
interface CartItem{
    id:string,
    title:string,
    price:number,
    description:string,
    images: { url: string }[]; 
    quantity:number,
    isChecked:boolean,
}



export default CartItem