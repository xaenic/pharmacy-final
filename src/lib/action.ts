"use server";
import { auth, signIn } from "@/auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { AuthError, Session } from "next-auth";
import {
  addCategory,
  addProduct,
  deleteCategory,
  deleteProduct,
  saveUser,
  updateCategory,
  updateProduct,
  updateUser,
} from "./db/db";
import { IUser } from "./models/userModel";
import { CartItem } from "./types/CartItems";
import {
  deleteAllCartItems,
  deleteItemFromCart,
  geTCartItems,
} from "./db/cart_item";
import {
  addBillingDetail,
  addItemToTransaction,
  makeTransaction,
  updateTransaction,
} from "./db/transaction";
import { stat } from "fs";
import { Product } from "./types/Product";
import { Transaction_Item } from "./types/Transaction";

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

export async function register(prevState: any, formData: FormData) {
  const user: IUser = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    gender: formData.get("gender") as string,
    phone_number: formData.get("phone_number") as string,
    role: formData.get("role") as string,
    password: await bcrypt.hash(formData.get("password") as string, 10),
    age: 25, // Assuming you want to initialize age as an empty string
    date_created: "", // Assuming date_created can be null or undefined
    active: true,
  };

  if (
    user.firstname == "" ||
    user.lastname == "" ||
    user.email == "" ||
    user.gender == "" ||
    user.phone_number == "" ||
    user.role == "" ||
    user.password == ""
  )
    return "All fields are required";
  const resp = await saveUser(user);

  if (resp?.includes("Success")) {
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
  return resp;
}
export async function addUser(prevState: any, formData: FormData) {
  const user: IUser = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    gender: formData.get("gender") as string,
    phone_number: formData.get("phone_number") as string,
    role: formData.get("role") as string,
    password: await bcrypt.hash("123123", 10),

    age: 25, // Assuming you want to initialize age as an empty string
    date_created: "", // Assuming date_created can be null or undefined
    active: true,
  };
  console.log(user);
  if (
    user.firstname == "" ||
    user.lastname == "" ||
    user.email == "" ||
    user.gender == "" ||
    user.phone_number == "" ||
    user.role == "" ||
    user.password == ""
  )
    return {
      message: "fail",
      errors: {
        name: ["All fields are required"],
      },
    };

  const resp = await saveUser(user);

  if (resp?.includes("Email"))
    return {
      message: "fail",
      errors: {
        name: [resp],
      },
    };
  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}
export async function updateThisUser(prevState: any, formData: FormData) {
  const a = formData.get("status") as string;
  const user: IUser = {
    staff_id: parseInt(formData.get("id") as string),
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    gender: formData.get("gender") as string,
    phone_number: formData.get("phone_number") as string,
    role: formData.get("role") as string,
    password: await bcrypt.hash("123123", 10),
    age: 25, // Assuming you want to initialize age as an empty string
    date_created: "", // Assuming date_created can be null or undefined
    active: a == "true",
  };

  if (
    user.firstname == "" ||
    user.lastname == "" ||
    user.email == "" ||
    user.gender == "" ||
    user.phone_number == "" ||
    user.role == "" ||
    user.password == ""
  )
    return {
      message: "fail",
      errors: {
        name: ["All fields are required"],
      },
    };

  const resp = await updateUser(user);

  if (resp?.includes("Email"))
    return {
      message: "fail",
      errors: {
        name: [resp],
      },
    };
  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
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
export async function updateNewCategory(prevState: any, formData: FormData) {
  const category_name = formData.get("category_name") as string;
  const capacity = formData.get("capacity") as string;
  const id = formData.get("id") as string;
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

  const ok = await updateCategory(category_name, capacity, id);

  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}

export async function deleteNewCategory(prevState: any, formData: FormData) {
  const id = formData.get("category_id") as string;

  const ok = await deleteCategory(id);
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
  const expiry = formData.get("expiry") as string;
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
  try {
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
      type,
      expiry
    );
  } catch (e) {
    return {
      message: "fail",
      errors: {
        name: ["Invalid Expiry Date"],
      },
    };
  }

  return {
    message: "Success",
    errors: {
      name: [],
    },
  };
}
export async function updateStatus(
  user_id: number,
  transaction_id: number,
  status: string
) {
  await updateTransaction(user_id, transaction_id, status);
}
export async function placeOrder(prevState: any, formData: any) {
  const session = (await auth()) as any;
  const user_id = session?.user.staff_id;
  const {
    firstname,
    lastname,
    phone_number,
    email,
    city,
    barangay,
    address,
    zipcode,
  } = formData;
  console.log(address);
  if (firstname.length == 0 || lastname.length == 0) {
    return {
      message: "fail",
      errors: {
        name: ["Enter name"],
      },
    };
  }

  await addBillingDetail(
    user_id,
    firstname,
    lastname,
    city,
    barangay,
    zipcode,
    address
  );
  let total = 32 + 10;
  const items: CartItem[] | null = await geTCartItems(user_id);
  if (!items)
    return {
      message: "fail",
      errors: {
        name: ["error occured"],
      },
    };
  items?.map((e, i) => {
    total += e.price * e.qty;
  });

  if (items.length == 0)
    return {
      message: "fail",
      errors: {
        name: ["error occured"],
      },
    };
  const row = await makeTransaction(user_id, items.length, total, "Pending");
  if (!row)
    return {
      message: "fail",
      errors: {
        name: ["error occured"],
      },
    };
  await deleteAllCartItems(user_id);
  items.map(async (e, i) => {
    const ok = await updateProduct(
      e.product_name,
      e.image,
      e.code,
      e.price + "",
      e.brand,
      e.manufacturer,
      e.quantity - e.qty + "",
      e.category_id + "",
      e.id + "",
      e.description,
      e.type,
      e.expiry_date
    );
    await addItemToTransaction(row[0].id, e.product_id, e.qty);
  });
  return row[0].id;
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
  const expiry = formData.get("expiry") as string;
  const prevQ = formData.get("prevQ") as string;
  let restock_date = formData.get("restock") as string;

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
  if (prevQ != quantity) restock_date = new Date().toISOString();
  try {
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
      type,
      expiry.split("[")[0],
      restock_date
    );
  } catch (e) {
    console.log(e);
    return {
      message: "fail",
      errors: {
        name: ["Enter a Valid Expiry Date"],
      },
    };
  }

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

export async function setTransactionStatus(id: number, status: string) {
  await updateTransaction(1, id, status);
}

export async function addTransaction(items: Transaction_Item[]) {
  let total = 0;

  items.map((e) => (total += e.quantity * e.price));

  const session = (await auth()) as any;
  const row = await makeTransaction(
    session?.user?.staff_id,
    items.length,
    total,
    "Completed"
  );
  if (!row) return null;

  items.map(async (e, i) => {
    const ok = await updateProduct(
      e.product_name,
      e.image,
      e.code,
      e.price + "",
      e.brand,
      e.manufacturer,
      e.quantity - e.qty + "",
      e.category_id + "",
      e.id + "",
      e.description,
      e.type,
      e.expiry_date
    );
    await addItemToTransaction(row[0].id, e.id, e.quantity);
  });
  return row[0].id;
}
