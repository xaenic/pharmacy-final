"use server";
import { sql } from "@vercel/postgres";
import { IUser } from "../models/userModel";

//users
export const getUser = async (userEmail: string): Promise<IUser | null> => {
  try {
    const { rows } = await sql`SELECT * from USERS where email=${userEmail}`;
    return rows[0] as IUser;
  } catch {
    return null;
  }
};

// categories
export const addCategory = async (category_name: string, capacity: string) => {
  const ok =
    await sql`INSERT INTO category (category_name,capacity) VALUES(${category_name}, ${capacity})`;
  return ok;
};

export const getCategories = async () => {
  const ok = await sql`SELECT * FROM category`;
  return ok;
};

//products

export const addProduct = async (
  product_name: string,
  image: string,
  code: string,
  price: string,
  brand: string,
  quantity: string,
  category: string
) => {
  const ok =
    await sql`INSERT INTO product (product_name,image,code,price,brand,quantity,category_id) VALUES(${product_name}, ${image}, ${code}, ${price}, ${brand}, ${quantity}, ${category})`;

  return ok;
};
export const updateProduct = async (
  product_name: string,
  image: string,
  code: string,
  price: string,
  brand: string,
  quantity: string,
  category: string,
  id: string
) => {
  const ok =
    await sql`UPDATE product SET product_name = ${product_name}, image = ${image}, code = ${code}, price = ${price}, brand = ${brand}, quantity = ${quantity}, category_id = ${category} WHERE id = ${id}`;
  return ok;
};

export const getProductById = async (id: string) => {
  const ok = await sql`SELECT * FROM product WHERE id = ${id}`;
  return ok.rows[0];
};
export const getProducts = async () => {
  const ok = await sql`SELECT * FROM product`;
  return {
    products: ok.rows,
  };
};
