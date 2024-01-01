interface ProductProps{
    id:string,
    title:string,
    price:number,
    description:string,
    inventory: number,
    images: { url: string }[]; 
    creationAt:string,
    updatedAt:string,
    categoryId:number
}

export default ProductProps