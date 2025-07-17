import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0">
                <form
                  className="p-6 md:p-8"
                  action="/api/auth/signout"
                  method="post"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
                      <p className="text-muted-foreground text-balance">
                        {user.email}
                      </p>
                    </div>

                    <Button type="submit" className="w-full">
                      Выйти
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return redirect("/login");
}
