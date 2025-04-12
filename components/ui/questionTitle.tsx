import { CircleHelp } from 'lucide-react';

export default function Questiontitle({
	name,
	info
}: {
	name: string;
	info: string;
}) {
	return (
		<div className='flex items-center gap-[15px]'>
			<CircleHelp size={50} strokeWidth={1.5} color='#000' />
			<h1 className='text-[28px] text-start font-semibold text-black max-w-[1500px]'>{`${name}: ${info}`}</h1>
		</div>
	);
}
