import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm({
  className,
  actions,
  ...props
}: React.ComponentProps<"div"> & {
  actions: {
    login: (formData: FormData) => Promise<void>;
    signup: (formData: FormData) => Promise<void>;
  };
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Поднять руки!</h1>
                <p className="text-muted-foreground text-balance">
                  Шутка, мы соскучились
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Е-мейл</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@lanvalird.ru"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Забыл пароль?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  formAction={actions["signup"]}
                  variant="secondary"
                  className="w-full"
                >
                  Зарегистрироваться
                </Button>
                <p className="text-center text-muted-foreground">или же</p>
                <Button formAction={actions["login"]} className="w-full">
                  Войти
                </Button>
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login-bg.png"
              fill={true}
              alt="Image"
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Кликая сюды, ты бла-бла и соглашаешься{" "}
        <a href="#">с условиями использования</a> и{" "}
        <a href="#">политикой конфиденциальности</a>.
      </div>
    </div>
  );
}
