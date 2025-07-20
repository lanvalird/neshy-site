"use server";

import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error, status } = await supabase
      .from("accounts")
      .select(`username`)
      .eq("id", user?.id)
      .single();

    if ((error && status !== 406) || !data) {
      return "error";
    }

    return data.username;
  }

  return "error";
}
