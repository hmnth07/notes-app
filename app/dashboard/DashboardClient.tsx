"use client";
import { useEffect, useState } from "react";
import { LogoutButton } from "./LogoutButton";

export default function Dashboard({ user }: { user: any }) {
	const [notes, setNotes] = useState<string[]>([]);
	const [newNote, setNewNote] = useState("");

	useEffect(() => {
		fetch("/api/notes")
			.then((res) => res.json())
			.then((data) => setNotes(data.notes));
	}, []);

	const addNote = async () => {
		await fetch("/api/notes", {
			method: "POST",
			body: JSON.stringify({ note: newNote }),
			headers: { "Content-Type": "application/json" },
		});

		setNotes((prev) => [...prev, newNote]);
		setNewNote("");
	};

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

			{/* Notes Section */}
			<div className="bg-white p-4 rounded-xl shadow">
				<h2 className="text-xl font-medium text-gray-800 mb-2">Your Notes</h2>
				{notes.length > 0 ? (
					<ul className="list-disc list-inside text-gray-700 mb-4">
						{notes.map((note, idx) => (
							<li key={idx}>📝 {note}</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500 mb-4">No notes yet.</p>
				)}

				{/* Add Note */}
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={newNote}
						onChange={(e) => setNewNote(e.target.value)}
						placeholder="New note"
						className="flex-1 px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
					/>
					<button
						onClick={addNote}
						className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition cursor-pointer"
					>
						Add Note
					</button>
				</div>
			</div>
		</div>
	);
}
