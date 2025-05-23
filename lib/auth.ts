"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode("my-secret");

type UserPayload = {
	userId: number;
	email: string;
};

export async function getUserFromToken(
	req?: NextRequest
): Promise<UserPayload | null> {
	let token: string | undefined;

	if (req) {
		// ✅ Safe access with optional chaining
		const cookie = req.cookies.get?.("token");
		token = typeof cookie === "object" ? cookie.value : cookie;
	} else {
		try {
			// ✅ Assume cookies() is sync
			const cookieStore = cookies();
			const cookie = (await cookieStore).get?.("token");
			token = typeof cookie === "object" ? cookie?.value : cookie;
		} catch {
			token = undefined;
		}
	}

	if (!token) return null;

	try {
		const { payload } = await jwtVerify(token, SECRET);
		return payload as UserPayload;
	} catch (e) {
		return null;
	}
}
