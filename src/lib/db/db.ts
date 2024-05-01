"use server";
import { sql } from "@vercel/postgres";
import { IUser } from "../models/userModel";
import { Product } from "../types/Product";

//users
export const getUser = async (userEmail: string): Promise<IUser | null> => {
  try {
    const { rows } = await sql`SELECT * from USERS where email=${userEmail}`;
    return rows[0] as IUser;
  } catch {
    return null;
  }
};

export const saveUser = async (User: IUser) => {
  const exist = await getUser(User.email);

  if (exist) {
    return "Email already exists";
  }

  try {
    const { rows } =
      await sql`INSERT INTO users (firstname,lastname,email, gender, phone_number, role,password,age) VALUES(${User.firstname}, ${User.lastname},${User.email}, ${User.gender}, ${User.phone_number}, ${User.role}, ${User.password} ,${User.age})`;
    return "Successfully Registered";
  } catch (e) {
    console.log(e);
    return null;
  }

  return;
};

// categories
export const addCategory = async (category_name: string, capacity: string) => {
  const ok =
    await sql`INSERT INTO category (category_name,capacity) VALUES(${category_name}, ${capacity})`;
  return ok;
};
export const updateCategory = async (
  category_name: string,
  capacity: string,
  id: string
) => {
  const ok =
    await sql`UPDATE category SET category_name = ${category_name}, capacity=${capacity} WHERE category_id = ${id}`;
  return ok;
};
export const getCategories = async () => {
  const ok = await sql`SELECT * FROM category ORDER BY category_id`;
  return ok;
};

export const getCategoryById = async (id: string): Promise<Product> => {
  const ok = await sql`SELECT * FROM category  WHERE category_id = ${id}`;
  return ok.rows[0] as any;
};
export const deleteCategory = async (id: string) => {
  const ok = await sql`DELETE FROM category WHERE category_id = ${id}`;
  return ok;
};
//products

export const addProduct = async (
  product_name: string,
  image: string,
  code: string,
  price: string,
  brand: string,
  manufacturer: string,
  quantity: string,
  category: string,
  description: string,
  type: string
) => {
  const ok =
    await sql`INSERT INTO product (product_name,image,code,price,manufacturer,brand,quantity,category_id,description,type) VALUES(${product_name}, ${image}, ${code}, ${price}, ${manufacturer}, ${brand}, ${quantity}, ${category},${description},${type})`;

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
  manufacturer: string,
  quantity: string,
  category: string,
  id: string,
  description: string,
  type: string
) => {
  const ok =
    await sql`UPDATE product SET product_name = ${product_name}, description = ${description}, image = ${image}, code = ${code}, price = ${price}, manufacturer = ${manufacturer}, brand = ${brand}, quantity = ${quantity}, category_id = ${category},type = ${type} WHERE id = ${id}`;
  return ok;
};

export const getProductById = async (id: string): Promise<Product> => {
  const ok =
    await sql`SELECT * FROM product INNER JOIN category ON category.category_id = product.category_id WHERE id = ${id}`;
  return ok.rows[0] as Product;
};
export const getProducts = async (): Promise<Product[]> => {
  const ok =
    await sql`SELECT * FROM product INNER JOIN category ON category.category_id = product.category_id ORDER BY id`;
  return ok.rows as Product[];
};
