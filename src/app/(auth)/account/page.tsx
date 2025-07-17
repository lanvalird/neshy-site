import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return user.email
  }

  return redirect("/login");
}
