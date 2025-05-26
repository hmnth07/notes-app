// app/dashboard/page.tsx (Server Component)
import { supabase } from "@/lib/supabase";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { LogoutButton } from "./LogoutButton";

export default async function DashboardPage() {
	const user = await getUserFromToken();
	const { data: notes } = await supabase
		.from("notes")
		.select("*")
		.order("created_at", { ascending: false });

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="p-6 max-w-2xl mx-auto space-y-6">
			{/* Header + Logout */}
			<div className="flex items-center justify-between">
				<p className="text-2xl font-semibold text-gray-400">Dashboard</p>
				<LogoutButton />
			</div>
			{/* User Info */}
			{user ? (
				<div className="bg-white p-4 rounded-xl shadow">
					<p className="text-gray-700">
						Welcome, <span className="font-semibold">{user.email}</span>!
					</p>
					<p className="text-sm text-gray-500">User ID: {user.userId}</p>
				</div>
			) : (
				<p className="text-red-500">Unable to load user info.</p>
			)}
			<DashboardClient initialNotes={notes ?? []} />;
		</div>
	);
}
