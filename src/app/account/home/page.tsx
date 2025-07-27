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

    return (
      <div className="flex w-full min-h-svh flex-col justify-start p-6 md:p-10">
        <h1 className="scroll-m-20 mb-16 text-center text-4xl font-extrabold tracking-tight text-balance">
          Управление аккаунтом
        </h1>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Основные настройки
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Этот раздел ещё в разработке, {data.username}.
        </p>
      </div>
    );
  }

  return "error";
}
