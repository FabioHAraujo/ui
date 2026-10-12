// Demo-only auth: credentials are public and live in localStorage. Never copy this into a real app.
export interface AuthUser {
	name: string;
	email: string;
	role: string;
}

export const DEMO_EMAIL = "demo@codeatlas.dev";
export const DEMO_PASSWORD = "demo123";

const KEY = "ca_auth";
const DEMO_USERS = [
	{ email: DEMO_EMAIL, password: DEMO_PASSWORD, name: "Ana Lima", role: "Admin" },
	{ email: "dev@codeatlas.dev", password: "dev123", name: "Carlos Melo", role: "Editor" },
];

export function getUser(): AuthUser | null {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? (JSON.parse(raw) as AuthUser) : null;
	} catch {
		return null;
	}
}

export function login(email: string, password: string): AuthUser | null {
	const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
	if (!found) return null;
	const user: AuthUser = { name: found.name, email: found.email, role: found.role };
	try {
		localStorage.setItem(KEY, JSON.stringify(user));
	} catch {
		// Storage can be unavailable (private mode); the session just won't persist.
	}
	return user;
}

export function logout(): void {
	try {
		localStorage.removeItem(KEY);
	} catch {
		// Nothing persisted, nothing to clear.
	}
}
