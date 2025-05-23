"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		await fetch("/api/logout/", { method: "POST" });
		router.push("/"); // Send user back to login/home page
	};

	return (
		<button
			onClick={handleLogout}
			className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 shadow cursor-pointer"
		>
			Log out
		</button>
	);
}

export default LogoutButton;
