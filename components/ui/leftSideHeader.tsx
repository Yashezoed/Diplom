'use client';
import { ChevronLeft} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function LeftSideHeader({ title }: { title?: string }) {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<>
			{pathname === '/student' ? (
				<>
					<button onClick={() => router.back()}>
						<ChevronLeft
							color='#000'
							height={60}
							width={60}
							strokeWidth={1.25}
						/>
					</button>
					<h1 className='text-[64px] font-semibold text-black ml-5'>
						Ваши дисциплины
					</h1>
				</>
			) : (
				<>
					<button onClick={() => router.back()}>
						<ChevronLeft
							color='#000'
							height={60}
							width={60}
							strokeWidth={1.25}
						/>
					</button>
					<h1 className='text-4xl font-bold text-black ml-5'>
						{title}
					</h1>
				</>
			)}
		</>
	);
}
