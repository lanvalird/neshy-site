"use server";

import { AccountForm } from "@/components/account-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

    if (!data.username) {
      return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <AccountForm />
          </div>
        </div>
      );
    } else {
      return data.username;
    }
  }

  return redirect("/login");
}
