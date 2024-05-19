import { CartItem, Product } from "./CartItems";

export interface Transaction {
  user_id: number;
  name: string;
  address: string;
  total_items: number;
  total: number;
  date_created: Date;
}

export interface Transaction_Item extends Product {
  transaction_id: number;
  product_id: number;
  qty: number;
}

export interface BillingDetail {
  user_id: number;
  first_name: string;
  last_name: string;
  city: string;
  barangay: string;
  zipcode: number;
  date_created: Date;
  address: string;
}
