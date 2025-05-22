import LeftSideHeader from './leftSideHeader';
import { ExitButton } from './exit';
import ProfileButton from './profileButton';
import Link from 'next/link';

export default function Header({ title, exit }: { title: string; exit?: boolean }) {
	return (
		<header className='flex justify-between items-center  '>
			<div className='flex items-center'>
				<LeftSideHeader title={title} />
			</div>
			<div className='flex gap-4'>
				{exit && <ExitButton />}
				{!exit && <Link href={'/teacher'}><ProfileButton/></Link>}
			</div>
		</header>
	);
}
