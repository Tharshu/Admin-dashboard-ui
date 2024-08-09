import { Product } from './product.model';

export interface OrderDetailsRes {
  orderDetailsId: number;
  orderId: number;
  productId: string
  productName: string;
  inventoryId: number;
  variantName: string;
  inventoryQuantity: number;
  variantId: number;
  variantQuantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
