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
  category: string,
  description: string,
  type: string
) => {
  const ok =
    await sql`INSERT INTO product (product_name,image,code,price,brand,quantity,category_id,description,type) VALUES(${product_name}, ${image}, ${code}, ${price}, ${brand}, ${quantity}, ${category},${description},${type})`;

  return ok;
};
export const deleteProduct = async (id: string) => {
  const ok = await sql`DELETE FROM product WHERE id = ${id}`;
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
  id: string,
  description: string,
  type: string
) => {
  const ok =
    await sql`UPDATE product SET product_name = ${product_name}, description = ${description}, image = ${image}, code = ${code}, price = ${price}, brand = ${brand}, quantity = ${quantity}, category_id = ${category},type = ${type} WHERE id = ${id}`;
  return ok;
};

export const getProductById = async (id: string) => {
  const ok = await sql`SELECT * FROM product WHERE id = ${id}`;
  return ok.rows[0];
};
export const getProducts = async () => {
  const ok =
    await sql`SELECT * FROM product INNER JOIN category ON category.category_id = product.category_id ORDER BY product_name`;
  return {
    products: ok.rows,
  };
};
