"use server";
import { auth, signIn } from "@/auth";
import { z } from "zod";

import { AuthError, Session } from "next-auth";
import { addCategory, addProduct, deleteProduct, updateProduct } from "./db/db";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  formData.set("role", "admin");
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function addNewCategory(prevState: any, formData: FormData) {
  const category_name = formData.get("category_name") as string;
  const capacity = formData.get("capacity") as string;
  if (category_name.length <= 3) {
    return {
      message: "fail",
      errors: {
        name: ["Category Name is too short."],
      },
    };
  }
  if (parseInt(capacity) <= 0) {
    return {
      message: "fail",
      errors: {
        name: ["Invalid Capacity"],
      },
    };
  }

  const ok = await addCategory(category_name, capacity);

  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}

export async function addNewProduct(prevState: any, formData: FormData) {
  const product_name = formData.get("product_name") as string;
  const image = formData.get("image") as string;
  const code = formData.get("code") as string;
  const price = formData.get("price") as string;
  const brand = formData.get("brand") as string;
  const manufacturer = formData.get("manufacturer") as string;
  const quantity = formData.get("quantity") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  if (product_name.length == 0) {
    return {
      message: "fail",
      errors: {
        name: ["Enter product name"],
      },
    };
  }
  if (!image.includes("https")) {
    return {
      message: "fail",
      errors: {
        name: ["Invalid Image URL"],
      },
    };
  }

  const ok = await addProduct(
    product_name,
    image,
    code,
    price,
    brand,
    manufacturer,
    quantity,
    category,
    description,
    type
  );

  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}
export async function updateNewProduct(prevState: any, formData: FormData) {
  const product_name = formData.get("product_name") as string;
  const image = formData.get("image") as string;
  const code = formData.get("code") as string;
  const price = formData.get("price") as string;
  const brand = formData.get("brand") as string;
  const manufacturer = formData.get("manufacturer") as string;
  const quantity = formData.get("quantity") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const id = formData.get("id_number") as string;

  if (product_name.length == 0) {
    return {
      message: "fail",
      errors: {
        name: ["Enter product name"],
      },
    };
  }
  if (!image.includes("https")) {
    return {
      message: "fail",
      errors: {
        name: ["Invalid Image URL"],
      },
    };
  }

  const ok = await updateProduct(
    product_name,
    image,
    code,
    price,
    brand,
    manufacturer,
    quantity,
    category,
    id,
    description,
    type
  );

  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}

export async function deleteNewProduct(prevState: any, formData: FormData) {
  const id = formData.get("id_number") as string;

  const ok = await deleteProduct(id);
  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}
