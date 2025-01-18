import Link from "next/link";

interface LessonBlockProps {
	text: string;
}

export default function LessonBlock({text}: LessonBlockProps) {
	return (
		<Link href={'#'} className='min-w-full min-h-[74] bg-white rounded-2xl flex items-center '>
			<p className=' text-[28px] font-semibold text-[#008AD1] px-[20px]'>{text}</p>
		</Link>
	);
};