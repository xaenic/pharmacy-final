export type Product = {
  id: number;
  product_name: string;
  image: string;
  price: number;
  code: string;
  quantity: number;
  category_id: string;
  brand: string;
  description: string;
  manufacturer: string;
  category_name: string | null;
  type: string;
  expiry_date: string;
  restock_date: string;
};
