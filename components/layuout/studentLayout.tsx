import { UserCircle2 } from 'lucide-react';
import { ExitButton } from '@/components/ui/exit';
import Link from 'next/link';
import LeftSideHeader from '../ui/leftSideHeader';

export default async function StudentLayout({
	children,
	title
}: {
	children: React.ReactNode;
	title?: string;
}) {
	
	return (
		<>
			<header className='flex justify-between items-center min-h-[75px] mt-10'>
				<div className='flex items-center'>
					<LeftSideHeader title={title}/>
				</div>

				<div className='flex gap-4'>
					<Link href={'/student/profile'}>
						<UserCircle2 className='w-8 h-8 text-white cursor-pointer' />
					</Link>
					<ExitButton />
				</div>
			</header>
			{children}
		</>
	);
}
