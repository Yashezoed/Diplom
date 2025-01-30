import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { Login } from './lib/api/auth';
import NextAuth, { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { IauthResponse } from './interfaces/authResponse';

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
				console.log(parseCredentials)
				const response: IauthResponse = await Login(
					parseCredentials.data.login,
					parseCredentials.data.password
				);
				console.log(response)
				// const TOKEN = response;
				// const DECODED_TOKEN = JSON.parse(atob(TOKEN.split('.')[1]));
				// const user_id = DECODED_TOKEN.id;
				// const role =
				// 	DECODED_TOKEN[
				// 		'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
				// 	];

				const user: User = {
					user: {
						id: response.idUser,
						role: response.roleDto.name,
						name: response.username
					},
					token: response.jwt
				};
				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
				token.token = user.token;
			}
			return token;
		},
		session({ session, token }) {
			session.token = token.token as string;
			session.user = token.user as AdapterUser & User;
			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const pathname = nextUrl.pathname;
			const isOnDashboard =
				pathname.startsWith('/admin') ||
				pathname.startsWith('/student') ||
				pathname.startsWith('/teacher');
			const isLoggedIn = !!auth?.user;

			if (isOnDashboard || pathname === '/') {
				return isLoggedIn;
			} else if (isLoggedIn) {
				const credentials = auth?.user.user.role;
				return Response.redirect(new URL(`/${credentials}`, nextUrl));
			}

			return true;
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
			name: string;
		};
		token: string;
	}
	interface JWT {
		user: User;
		token: string;
	}
}
