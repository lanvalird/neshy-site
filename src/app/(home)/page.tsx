import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Neshy Docs</h1>
      <p className="text-fd-muted-foreground">
        Добро пожаловать в нашу документацию по серверу!
        <Link href="/docs" className="block mt-2 text-fd-foreground underline">
          Продолжить {"->"}
        </Link>
      </p>
    </main>
  );
}
