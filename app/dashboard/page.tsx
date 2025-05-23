// app/dashboard/page.tsx (Server Component)
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
	const user = await getUserFromToken();

	if (!user) {
		redirect("/login");
	}

	return <DashboardClient user={user} />;
}
