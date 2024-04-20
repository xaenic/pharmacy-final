"use server";
import { auth } from "@/auth";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import { getUser } from "@/lib/db/db";
import { IUser } from "@/lib/models/userModel";
import { sql } from "@vercel/postgres";

export default async function Home({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  const session = await auth();
  return (
    <div>
      {session?.user?.name}

      <LogoutButton />
    </div>
  );
}
