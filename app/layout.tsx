import { Metadata } from 'next';
import '@/app/global.css';
import { montserrat } from '@/components/ui/fonts';
// import { SessionProvider } from 'next-auth/react';
export const metadata: Metadata = {
	title: 'Приложение тестирования'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		
		<html lang='ru'>
			<body className={`${montserrat.className} antialized overflow-y-hidden`}>{/* <SessionProvider> */}{children}{/* </SessionProvider> */}</body>
		</html>
	);
}
