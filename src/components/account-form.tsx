"use client";

// В будущем перемещу остальную часть формы и разделю на подкомпоненты

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" action="/api/user/save" method="post">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
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

              <div className="flex flex-col md:grid md:grid-row md:grid-cols-2 gap-3">
                <Button type="submit" className="w-full">
                  Сохранить
                </Button>
                <Button
                  formAction="/api/auth/signout"
                  type="submit"
                  variant="secondary"
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
  );
}
