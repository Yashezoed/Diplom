import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { Login } from './lib/api/auth';
import NextAuth, { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';


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
				console.log('Credentials ', credentials);
				const parseCredentials = z
					.object({
						login: z.string(),
						password: z.string() /* .min(6) */
					})
					.safeParse(credentials);
				console.log('parseCredentials.data', parseCredentials.data);

				if (!parseCredentials.success) {
					return null;
				}
				const response = await Login(
					parseCredentials.data.login,
					parseCredentials.data.password
				);
				console.log('RESPONSE AFTER LOGIN', response);
				/* if (response.error) {
					return null;
				} */
				// return response;
				return {
					user: {
						id: 1,
						login: "asdas"
					},
					token: response
				};
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
		session({session, token}) {
			console.log('Session', session);
			console.log('TOKEN', token);
			session.token = token.token as string;
			session.user = token.user as AdapterUser & User;
			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnAdmin = nextUrl.pathname.startsWith('/admin');

			if (isOnAdmin) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/admin', nextUrl));
			}
			return true;
		}
	}
});

declare module "next-auth" {
	interface Session {
		token: string
		user: User
	}
	interface User {
		user: {
			id: number
			login: string
		}
		token: string
	}
	interface JWT {
		user: User
		token: string 
	}
}