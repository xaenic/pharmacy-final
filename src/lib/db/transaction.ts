import { sql } from "@vercel/postgres";
import { BillingDetail } from "../types/Transaction";

export const makeTransaction = async (
  user_id: number,
  total_items: number,
  total: number
) => {
  try {
    const { rows } = await sql`
    INSERT INTO transaction (user_id, total_items, total)
    VALUES (${user_id}, ${total_items}, ${total})
    RETURNING *;`;
    return rows;
  } catch {
    return null;
  }
};
export const addItemToTransaction = async (
  transaction_id: number,
  product_id: number,
  qty: number
) => {
  try {
    const { rows } = await sql`
    INSERT INTO transaction_item (transaction_id, product_id, quantity)
    VALUES (${transaction_id}, ${product_id}, ${qty})`;
    return rows;
  } catch {
    return null;
  }
};
export const getBillingDetail = async (user_id: number) => {
  try {
    const { rows } =
      await sql`SELECT * from billing_details WHERE user_id = ${user_id}`;
    return rows[0] as BillingDetail;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const addBillingDetail = async (
  user_id: number,
  firstname: string,
  lastname: string,
  city: string,
  barangay: string,
  zipcode: number,
  address: string
) => {
  try {
    if (await getBillingDetail(user_id)) {
      await sql`UPDATE billing_details SET first_name = ${firstname}, last_name=${lastname}, city = ${city}, barangay = ${barangay}, zipcode = ${zipcode}, address=${address} WHERE user_id=${user_id}`;
    } else {
      await sql`INSERT INTO billing_details (user_id,first_name,last_name,city,barangay, zipcode,address) VALUES(${user_id}, ${firstname},${lastname}, ${city},${barangay}, ${zipcode},${address})`;
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
