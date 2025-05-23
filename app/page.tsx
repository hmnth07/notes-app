"use client";
import { useState } from "react";

export default function HomePage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();
		if (data.success) {
			window.location.href = "/dashboard";
		} else {
			alert("Invalid login");
		}
	};

	return (
		<form onSubmit={login} className="flex flex-col w-64 gap-2 mx-auto mt-20">
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button type="submit">Login</button>
		</form>
	);
}
