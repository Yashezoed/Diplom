import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function Providers(props: { children: ReactNode }) {
	return <SessionProvider>{props.children}</SessionProvider>;
}
