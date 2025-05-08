import { BookOpenText, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

export default function AdmProfileCard({
	text,
	img
}: {
	text: string;
	img: 'user' | 'test';
}) {
	return (
		<Link
			href={'#'}
			className='w-full h-full group flex flex-col items-center justify-center cursor-pointer rounded-[60px] bg-primary  max-w-[526px] max-h-[624px] duration-500 text-[33px] font-semibold bg-primary hover:bg-accent'
		>
			{img === 'user' && (
				<User
					size={300}
					strokeWidth={1.25}
					className='duration-500 stroke-white group-hover:stroke-black '
				/>
			)}
			{img === 'test' && (
				<BookOpenText
					size={300}
					strokeWidth={1.25}
					className='duration-500 stroke-white group-hover:stroke-black '
				/>
			)}
			<div className='border-b-[3px] border-white flex items-center justify-around w-[370px] pt-[77px] text-white group-hover:text-black  duration-500 group-hover:border-black'>
				<span className='ml-[10px]'>{text}</span>
				<ChevronRight
					size={41}
					strokeWidth={1.25}
					className='duration-500 stroke-white group-hover:stroke-black '
				/>
			</div>
		</Link>
	);
}
