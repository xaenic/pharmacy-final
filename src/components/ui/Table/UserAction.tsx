"use server";

import { getProductById } from "@/lib/db/db";

async function UserAction(id: string) {
  const product = await getProductById(id);
  return <div>UserAction</div>;
}

export default UserAction;
