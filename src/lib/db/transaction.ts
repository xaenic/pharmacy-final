import { sql } from "@vercel/postgres";
import {
  BillingDetail,
  Transaction,
  Transaction_Item,
} from "../types/Transaction";
import { addToCart } from "./cart_item";
import { updateNewProduct } from "../action";
import { updateProduct } from "./db";

export const makeTransaction = async (
  user_id: number,
  total_items: number,
  total: number,
  status = "Completed"
) => {
  try {
    const { rows } = await sql`
    INSERT INTO transaction (user_id, total_items, total,status)
    VALUES (${user_id}, ${total_items}, ${total},${status})
    RETURNING *;`;
    return rows;
  } catch {
    return null;
  }
};
export const getTransaction = async (transaction_id: number) => {
  try {
    const { rows } = await sql`
      SELECT * FROM transaction  INNER JOIN users ON users.staff_id = transaction.user_id
      WHERE id = ${transaction_id} 
    `;
    const { rows: itemRows } = await sql`
        SELECT * FROM transaction_item 
        INNER JOIN product ON product.id = transaction_item.product_id 
        WHERE transaction_item.transaction_id = ${transaction_id}
      `;
    const transac = rows[0] as Transaction;
    transac.items = itemRows as Transaction_Item[];
    return transac;
  } catch (e) {
    console.log(e);
  }
};
export const updateTransaction = async (
  user_id: number,
  transaction_id: number,
  status: string
) => {
  const date = new Date().toISOString();
  try {
    if (status == "Cancelled") {
      const { rows } =
        await sql`SELECT * FROM transaction_item  INNER JOIN product ON product.id = transaction_item.product_id WHERE transaction_id = ${transaction_id}`;
      const ok = rows as Transaction_Item[];
      ok.map((e, i) => {
        updateProduct(
          e.product_name,
          e.image,
          e.code,
          e.price + "",
          e.brand,
          e.manufacturer,
          e.qty + e.quantity + "",
          e.category_id + "",
          e.id + "",
          e.description,
          e.type,
          e.expiry_date
        );
      });
    }
    const { rows } =
      await sql`UPDATE transaction set status = ${status}, updated_at = ${date} WHERE  id = ${transaction_id}`;
  } catch (e) {
    console.log(e);
  }
};

export const getUserTransactions = async (
  user_id: number
): Promise<Transaction[] | null> => {
  try {
    // Use parameterized query to prevent SQL injection
    const { rows: transactionRows } = await sql`
      SELECT * FROM transaction 
      WHERE transaction.user_id = ${user_id} 
      ORDER BY id DESC
    `;
    const transactions: Transaction[] = transactionRows as Transaction[];

    // Fetch items for each transaction
    const transactionsWithItems = await Promise.all(
      transactions.map(async (transaction) => {
        // Use parameterized query for inner SQL
        const { rows: itemRows } = await sql`
        SELECT * FROM transaction_item 
        INNER JOIN product ON product.id = transaction_item.product_id 
        WHERE transaction_item.transaction_id = ${transaction.id}
      `;
        transaction.items = itemRows as Transaction_Item[];
        return transaction;
      })
    );

    return transactionsWithItems;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return null;
  }
};
export const getReturnItems = async () => {
  try {
    const { rows } =
      await sql`SELECT * FROM transaction_item a INNER JOIN product ON product.id = a.product_id INNER JOIN transaction t ON t.id =  a.transaction_id WHERE t.status = 'Returned'`;
    return rows as Transaction_Item[];
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const getAllTransactions = async () => {
  try {
    const { rows } =
      await sql`SELECT id, status, user_id,total_items,total,transaction.date_created as date_created, firstname,lastname FROM transaction INNER JOIN users ON users.staff_id = transaction.user_id ORDER BY date_created DESC`;
    return rows as Transaction[];
  } catch (e) {
    console.log(e);
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
    INSERT INTO transaction_item (transaction_id, product_id, qty)
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
