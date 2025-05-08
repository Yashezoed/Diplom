import LeftSideHeader from './leftSideHeader';
import { ExitButton } from './exit';

export default function AdminHeader({ title }: { title: string }) {
	return (
		<header className='flex justify-between items-center  '>
			<div className='flex items-center'>
				<LeftSideHeader title={title} />
			</div>
			<div className='flex gap-4'>
				<ExitButton />
			</div>
		</header>
	);
}
