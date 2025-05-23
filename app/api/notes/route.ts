import { NextRequest, NextResponse } from "next/server";
import { getNotes, addNote } from "@/lib/notes";

export async function GET() {
	return NextResponse.json({ notes: getNotes() });
}

export async function POST(req: NextRequest) {
	const { note } = await req.json();
	addNote(note);
	return NextResponse.json({ success: true });
}
