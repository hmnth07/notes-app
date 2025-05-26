"use client";
import { useEffect, useState } from "react";

export default function Dashboard({ initialNotes }: { initialNotes: any[] }) {
	const [notes, setNotes] = useState(initialNotes);
	const [newNote, setNewNote] = useState("");

	// useEffect(() => {
	// 	fetch("/api/notes")
	// 		.then((res) => res.json())
	// 		.then((data) => setNotes(data.notes));
	// }, []);

	const addNote = async () => {
		const res = await fetch("/api/notes", {
			method: "POST",
			body: JSON.stringify({ note: newNote }),
			headers: { "Content-Type": "application/json" },
		});
		if (res.ok) {
			setNotes((prev) => [...prev, { content: newNote }]);
			setNewNote("");
		}
	};

	return (
		<div>
			{/* Notes Section */}
			<div className="bg-white p-4 rounded-xl shadow">
				<h2 className="text-xl font-medium text-gray-800 mb-2">Your Notes</h2>
				{notes.length > 0 ? (
					<ul className="list-disc list-inside text-gray-700 mb-4">
						{notes.map((note, idx) => (
							<li key={note.id || idx}>📝 {note.content}</li>
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
						className="flex-1 px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-black focus:border-0"
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
