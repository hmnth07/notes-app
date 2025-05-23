import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { findUser } from "@/lib/users";

// const SECRET = "my-secret"; // move to env var in real apps
const SECRET = "my-secret";
export async function POST(req: Request) {
	const { email, password } = await req.json();
	const user = findUser(email, password);

	if (!user) {
		return NextResponse.json({ success: false });
	}
	const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, {
		expiresIn: "1h",
	});

	const response = NextResponse.json({ success: true });

	response.cookies.set("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60, // 1 hour
	});
	return response;
}
