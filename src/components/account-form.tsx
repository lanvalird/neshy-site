"use client";

// В будущем перемещу остальную часть формы и разделю на подкомпоненты

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useId } from "react";

export function AccountForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const formId = useId();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
                <p className="text-muted-foreground text-balance">
                  Ваш адрес электронной почты успешно подтвеждён! <br />
                  Теперь самое «сложное» — укажите Ваш игровой никнейм
                </p>
              </div>

              <form
                action="/api/user/save"
                method="post"
                className="grid gap-3"
                id={formId}
              >
                <Label htmlFor="username">
                  Игровое имя пользователя (nickname)
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="acula_1"
                />
              </form>

              <div className="flex flex-col md:grid md:grid-row md:grid-cols-2 gap-3">
                <Button form={formId} className="w-full">
                  Сохранить
                </Button>
                <Button
                  onClick={() => {
                    fetch("/api/auth/signout", { method: "POST" });
                    redirect("/login");
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
