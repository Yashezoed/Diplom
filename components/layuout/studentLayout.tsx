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
		<div className='bg-white mt-10 rounded-[65px] w-[1750px] h-[875px]'>
			<header className='flex justify-between items-center min-h-[75px] pl-[65px] pr-[95px] pt-[80px] '>
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
			<main className=''>{children}</main>
		</div>
	);
}
