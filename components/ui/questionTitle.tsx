import { CircleHelp } from "lucide-react";

export default function Questiontitle({
	name,
	info
}: {
	name: string;
	info: string
}) {
	console.log(info);
	return (
		<>
			<div className='flex items-center gap-[15px] ml'>
				<CircleHelp size={30} strokeWidth={2.5} color='#ffffff' />
				<h1 className='text-[28px] font-semibold text-white'>{`${name}: ${info}`}</h1>
			</div>
		</>
	);
}