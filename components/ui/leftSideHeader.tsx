'use client';
import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function LeftSideHeader({
	title
}: {
	title?: string
}) {
	const pathname = usePathname();
	const router = useRouter();


	return (
		<>
			{pathname === '/student' ? (
				<h1 className='text-4xl font-bold text-white ml-5'>
					Ваши курсы
				</h1>
			) : (
				<>
					<button onClick={() => router.back()}>
						<ChevronLeft color='white' height={60} width={60} />
					</button>
					<h1 className='text-4xl font-bold text-white ml-5'>
						{title}
					</h1>
				</>
			)}
		</>
	);
}
