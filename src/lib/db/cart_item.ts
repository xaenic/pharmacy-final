import { sql } from "@vercel/postgres";

export const geTCartItems = async (
  user_id: number
): Promise<CartItem[] | null> => {
  try {
    const { rows } =
      await sql`SELECT * from cart_item INNER JOIN product ON product.id = cart_item.product_id where user_id=${user_id}`;
    return rows as CartItem[];
  } catch {
    return null;
  }
};
