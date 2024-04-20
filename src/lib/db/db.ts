import { sql } from "@vercel/postgres";
import { IUser } from "../models/userModel";

export const getUser = async (userEmail: string): Promise<IUser | null> => {
  try {
    const { rows } = await sql`SELECT * from USERS where email=${userEmail}`;
    return rows[0] as IUser;
  } catch {
    return null;
  }
};
