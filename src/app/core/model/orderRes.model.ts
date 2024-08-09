import { OrderDetailsRes } from './order-details-res.model';
import { Product } from './product.model';

export interface OrderRes {
  orderId: number;
  customerId: number;
  customerName: string
  orderDate: string;
  status: string;
  totalQuantity: number;
  totalPrice: number;
  finalPrice: number;
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
  orderDetails: OrderDetailsRes[];
}
