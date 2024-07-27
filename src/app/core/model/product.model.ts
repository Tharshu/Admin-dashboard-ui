import { ProductCollection } from './product-collection.model';
import { ProductType } from './product-type.model';
import { Price } from './price.model';
import { Inventory } from './inventory.model';

export type ProductStatus = 'draft' | 'proposed' | 'published' | 'rejected';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  isGiftcard: boolean;
  status: ProductStatus;
  thumbnail: string;
  collectionId: ProductCollection;
  typeId: ProductType;
  discountable: boolean;
  externalId: string;
  profileId: string;
  weight: number;
  length: number;
  height: number;
  width: number;
  hsCode: string;
  originCountry: string;
  midCode: string;
  material: string;
  totalCount: number;
  prices: Price[];
  inventoryDto?: Inventory | null; // Make inventoryDto optional
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
