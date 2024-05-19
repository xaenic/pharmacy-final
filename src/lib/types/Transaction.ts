import { IUser } from "../models/userModel";
import { CartItem, Product } from "./CartItems";

export interface Transaction extends IUser {
  id: number;
  user_id: number;
  status: string;
  items: Transaction_Item[];
  address: string;
  total_items: number;
  total: number;
  date_created: string;
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
  date_created: string;
  address: string;
}
