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
			<CircleHelp size={50} strokeWidth={2.25} color='#ffffff' />
			<h1 className='text-[28px] text-start leading-8 font-semibold text-white max-w-[1040px]'>{`${name}: ${info}`}</h1>
		</div>
	);
}
