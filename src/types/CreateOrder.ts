interface PurchaseItem {
    productId: string;
    quantity: number;
  }
  
interface CreateOrder {
    purchaseItems: PurchaseItem[];
}

export default CreateOrder;