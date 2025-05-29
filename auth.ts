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
				login: {},
				password: {}
			},
			async authorize(credentials) {
				const parseCredentials = z
					.object({
						login: z.string(),
						password: z.string().min(6)
					})
					.safeParse(credentials);

				if (!parseCredentials.success) {
					return null;
				}

				const response: IauthResponse = await Login(
					parseCredentials.data.login,
					parseCredentials.data.password
				);

				const user: User = {
					user: {
						id: response.idUser,
						role: response.roleDto.name,
						name: response.userName
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
			const isLoggedIn = !!auth?.user;
			const role = auth?.user.user.role;
			const isOnDashboard =
			(pathname.startsWith('/admin') && role === 'admin') ||
			(pathname.startsWith('/student') && role === 'student') ||
			(pathname.startsWith('/teacher') && role === 'teacher');

			if (isOnDashboard) {
				return isLoggedIn;
			} else if (isLoggedIn) {
				const credentials = auth?.user.user.role;
				return Response.redirect(new URL(`/${credentials}`, nextUrl));
			}
			else if (!isLoggedIn) return false;

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
