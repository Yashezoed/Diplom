import { Metadata } from 'next';
import '@/app/global.css';
import { montserrat } from '@/components/ui/fonts';
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
			<body className={`${montserrat.className} antialized`}>{children}</body>
		</html>
	);
}
