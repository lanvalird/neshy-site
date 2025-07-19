import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { Label } from "@radix-ui/react-label";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const supabase = await createClient();

  let loading = true;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    if (!user.email_confirmed_at) {
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
                      <h1 className="text-2xl font-bold">
                        Закончите настройку.
                      </h1>
                      <p className="text-muted-foreground text-balance">
                        Чтобы продолжить, вам надо подтвертить <br />
                        адрес электронной почты <br />
                        <span className="font-bold">{user.email}</span>
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
    } else {
      async function saveUsername(username: string) {
        "use server";

        if (!username) return;

        try {
          loading = true;
          const { error } = await supabase.from("accounts").upsert({
            username,
            updated_at: new Date().toISOString(),
          });
          if (error) throw error;

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          alert("Произошла ошибка");
        } finally {
          loading = false;
        }
      }

      return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0">
                <form className="p-6 md:p-8" method="post">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">ЗДобро пожаловать!</h1>
                      <p className="text-muted-foreground text-balance">
                        Ваш адрес электронной почты успешно подтвеждён! <br />
                        Теперь самое «сложное» — укажите Ваш игровой никнейм
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="username">
                        Игровое имя пользователя (nickname)
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        type="username"
                        placeholder="acula_1"
                        required
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                      <Button
                        formAction={(e) =>
                          saveUsername(e.get("username") as string)
                        }
                        type="submit"
                        disabled={loading}
                        className="w-full"
                      >
                        Сохранить
                      </Button>
                      <Button
                        formAction="/api/auth/signout"
                        type="submit"
                        disabled={loading}
                        className="w-full"
                      >
                        Выйти
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }

  return redirect("/login");
}
