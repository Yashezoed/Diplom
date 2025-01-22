'use client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSideHeader({
	title
}: {
	title?: string
}) {
	const pathname = usePathname();

	return (
		<>
			{pathname === '/student' ? (
				<h1 className='text-4xl font-bold text-white ml-5'>
					Ваши курсы
				</h1>
			) : (
				<>
					<Link href={'/student'}>
						<ChevronLeft color='white' height={60} width={60} />
					</Link>
					<h1 className='text-4xl font-bold text-white ml-5'>
						{title}
					</h1>
				</>
			)}
		</>
	);
}
