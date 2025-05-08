import { Metadata } from 'next';
import '@/app/global.css';
export const metadata: Metadata = {
	title: 'Приложение тестирования'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

				<div className='bg-background p-[30px] h-[100vh]'>
					<main className='bg-white rounded-[30px] p-[30px] w-full h-full'>
							{children}
					</main>
				</div>
	);
}
