import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { Login } from './lib/api/auth';
import NextAuth, { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { NextResponse } from 'next/server';


export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login'
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			async authorize(credentials) {
				// console.log('Credentials ', credentials);
				const parseCredentials = z
					.object({
						login: z.string(),
						password: z.string() /* .min(6) */
					})
					.safeParse(credentials);

				if (!parseCredentials.success) {
					return null;
				}
				const response = await Login(
					parseCredentials.data.login,
					parseCredentials.data.password
				);
				const TOKEN = response;
				const DECODED_TOKEN = JSON.parse(atob(TOKEN.split('.')[1]));
				const user_id = DECODED_TOKEN.id;
				const role =
					DECODED_TOKEN[
						'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
					];

				const user: User = {
					user: {
						id: user_id,
						role: role
					},
					token: response
				};
				return user;
			}
		})
	],
	callbacks: {

		jwt({ token, user }) {
			if (user) {
				token.user = user;
				token.token = user.token;
			}
			return  token;
		},
		session({ session, token }) {
			session.token = token.token as string;
			session.user = token.user as AdapterUser & User;
			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const credentials = auth?.user.user.role;

			// console.log("credetials => ", credentials)


			const isLoggedIn = !!auth?.user;
			const isOnRolePage = nextUrl.pathname.startsWith(`/${credentials}`);
			// console.log("isOnRolePage =>", isOnRolePage);
			// console.log("isLoggedIn =>", isLoggedIn);
			// console.log("nextUrl =>", nextUrl);
			if (isOnRolePage) {
				console.log('onRolePage')
				if (isLoggedIn) { console.log('Залогинен'); return true};
				console.log('false работает')
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				console.log('Else if работает');
				return NextResponse.redirect(new URL(`/${credentials}`, nextUrl));
			}
			else {
				if (nextUrl.pathname === '/login') {console.log('В элсе иф работает');return true};
				console.log('ЭЛСе работает');
				return NextResponse.redirect(new URL('/login', nextUrl));
			}

		}
	}
});

declare module 'next-auth' {
	interface Session {
		token: string;
		user: User;
	}
	interface User {
		user: {
			id: number;
			role: string;
		};
		token: string;
	}
	interface JWT {
		user: User;
		token: string;
	}
}
