import { TimerIcon } from "lucide-react";

export default function Timer() {
	return (
		<div className="flex justify-center">
			<TimerIcon size={36} color='#ffffff' strokeWidth={2.25} />
			<h1 className='text-[28px] text-start leading-8 font-semibold text-white max-w-[1040px]'>Время</h1>
		</div>
	);
}
