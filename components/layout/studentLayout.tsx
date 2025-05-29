import Link from 'next/link';
import LeftSideHeader from '../ui/leftSideHeader';
import ProfileButton from '../ui/profileButton';

export default function StudentLayout({
	children,
	title,
	profileBtn
}: {
	children: React.ReactNode;
	title?: string;
	profileBtn?: boolean;
}) {
	return (
		<div className='bg-white rounded-[30px] p-[30px] w-full h-full flex flex-col'>
			<header className='flex justify-between items-center  '>
				<div className='flex items-center'>
					<LeftSideHeader title={title} />
				</div>

				{!profileBtn && (
					<div className='flex gap-4'>
						<Link href={'/student/profile'}>
							<ProfileButton />
						</Link>
					</div>
				)}
			</header>
			<main className='flex-1 overflow-hidden'>{children}</main>
		</div>
	);
}
