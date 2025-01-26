export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  description: string;
  type: string;
  quantity: number;
  genre: string;
}

export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
  paymentIntentId?: string;
  clientSecret?: string;
}
