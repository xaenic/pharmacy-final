"use server";
import { sql } from "@vercel/postgres";
import { CartItem } from "../types/CartItems";

export const geTCartItems = async (
  user_id: number
): Promise<CartItem[] | null> => {
  try {
    const { rows } =
      await sql`SELECT * from cart_item INNER JOIN product ON product.id = cart_item.product_id where user_id=${user_id} ORDER BY date_created DESC`;
    return rows as CartItem[];
  } catch {
    return null;
  }
};
export const getCartItem = async (user_id: number, product_id: number) => {
  try {
    const { rows } =
      await sql`SELECT * FROM cart_item WHERE user_id = ${user_id} and product_id = ${product_id}`;
    return rows[0] as CartItem;
  } catch (e) {
    return null;
  }
};
export const addToCart = async (
  stocks: number = -1,
  user_id: number,
  product_id: number,
  quantity: number
): Promise<Boolean> => {
  console.log(quantity, stocks);
  if (stocks != -1 && quantity > stocks) return false;
  try {
    const product: CartItem | null = await getCartItem(user_id, product_id);

    if (stocks != -1 && product && product?.qty >= stocks) return false;
    if (product) {
      const qty = product.qty + quantity;
      await sql`UPDATE cart_item set qty = ${qty} WHERE product_id = ${product_id}`;
    } else {
      const ok =
        await sql`INSERT INTO cart_item (user_id,product_id,qty) VALUES(${user_id}, ${product_id},${quantity})`;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

export const deleteItemFromCart = async (
  user_id: number,
  product_id: number
): Promise<Boolean> => {
  try {
    const ok =
      await sql`DELETE FROM cart_item WHERE user_id = ${user_id} and product_id = ${product_id}`;
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
