import { Product } from './product.model';
import { Currencies } from './currencies.model';

export interface Price {
  priceId: number;
  locationId: number;
  currencyId: Currencies;
  productId: Product;
  amount: number;
}
