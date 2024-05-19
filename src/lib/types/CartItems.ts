// Define the Product type
export type Product = {
  id: number;
  product_name: string;
  image: string;
  price: number;
  code: string;
  quantity: number; // Product quantity might refer to stock quantity
  category_id: number; // Assuming this should be a number
  brand: string;
  description: string;
  manufacturer: string;
  category_name: string | null;
  type: string;
};

// Define the CartItem type extending Product
export interface CartItem extends Product {
  user_id: number;
  product_id: number; // Typically, product_id should be the same as id from Product
  qty: number; // Quantity in the cart
}
