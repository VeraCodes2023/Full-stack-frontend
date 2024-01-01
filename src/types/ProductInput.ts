interface ProductInput{
    title:string,
    price:number,
    description:string,
    inventory:number,
    categoryId:number,
    images:[{url:string}]
}

export default ProductInput;