"use server";

import { redirect } from "next/navigation";

export default async function AccountPage() {
  return redirect("/account/home");
}
