let notes: string[] = [];

export function getNotes() {
	return notes;
}

export function addNote(note: string) {
	notes.push(note);
}
