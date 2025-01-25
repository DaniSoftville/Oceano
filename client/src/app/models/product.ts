export interface Product {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  genre?: string;
  type?: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  genres: string[];
  pageNumber: number;
  pageSize: number;
}
