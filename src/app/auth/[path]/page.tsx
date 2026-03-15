import { notFound } from "next/navigation";
import { AuthView } from "@neondatabase/neon-js/auth/react/ui";

type AuthPath = "sign-in" | "sign-up" | "sign-out";

type AuthPageProps = {
  params: Promise<{ path: string }>;
};

const validPaths = new Set<AuthPath>(["sign-in", "sign-up", "sign-out"]);

export default async function AuthPage({ params }: AuthPageProps) {
  const { path } = await params;

  if (!validPaths.has(path as AuthPath)) {
    notFound();
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <AuthView pathname={path as AuthPath} />
      </div>
    </main>
  );
}
