import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("my-secret"); // Must be a Uint8Array

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	try {
		const { payload } = await jwtVerify(token, SECRET);
		console.log("JWT verified! Payload:", payload);
		return NextResponse.next();
	} catch (err) {
		console.error("Token verification failed:", err);
		return NextResponse.redirect(new URL("/", req.url));
	}
}

export const config = {
	matcher: ["/dashboard"],
};
