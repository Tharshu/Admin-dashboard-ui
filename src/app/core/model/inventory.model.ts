import { Variant } from './variant.model';

export interface Inventory {
  inventoryId: number;
  productId: string;
  locationId: number;
  totalQuantity: number;
  soldQuantity: number;
  availableQuantity: number;
  variantDtoList: Variant[];
}
