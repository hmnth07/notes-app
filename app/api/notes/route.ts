import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
// import { getNotes, addNote } from "@/lib/notes";

export async function GET() {
	const { data: notes, error } = await supabase
		.from("notes")
		.select("*")
		.order("created_at", { ascending: false });

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json({ notes });
}

export async function POST(req: Request) {
	const body = await req.json();

	const { data, error } = await supabase
		.from("notes")
		.insert([{ content: body.note }]);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json({ success: true });
}
