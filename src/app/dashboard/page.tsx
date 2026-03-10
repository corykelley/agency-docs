import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { getWebsitesByUser } from "@/db/queries/websites";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const websites = await getWebsitesByUser(session.user.id);

  return <DashboardClient websites={websites} />;
}
