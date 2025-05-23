// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
	const res = NextResponse.json({ success: true });

	// Clear the JWT cookie
	res.cookies.set("token", "", {
		httpOnly: true,
		path: "/",
		expires: new Date(0), // Set to past date to expire it
	});

	return res;
}
