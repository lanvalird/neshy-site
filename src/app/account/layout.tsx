import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AccountSidebar } from "@/components/account-sidebar";
import { AccountForm } from "@/components/account-form";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <main className="w-full max-w-sm md:max-w-3xl">
            <AccountForm />
          </main>
        </div>
      );
    } else {
      return (
        <SidebarProvider>
          <AccountSidebar />
          <main className="w-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      );
    }
  }

  return redirect("/login");
}
