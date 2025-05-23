export const users = [
	{
		id: 1,
		email: "test@example.com",
		password: "1234", // plaintext for now (not secure!)
	},
];

export function findUser(email: string, password: string) {
	return users.find(
		(user) => user.email === email && user.password === password
	);
}
