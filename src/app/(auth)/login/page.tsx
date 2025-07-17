import { LoginForm } from "@/components/login-form";
import { login, signup } from "./actions";

export default function LoginPage({error}: {error: React.ReactNode}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {error}
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm actions={{ login, signup }} />
      </div>
    </div>
  );
}
