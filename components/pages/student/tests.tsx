'use client';
import { ITest } from '@/interfaces/test';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Tests(props: { data: ITest[] }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const data = props.data;


	const clickHandler = (testId: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('testId', `${testId}`);
		replace(`${pathname}?${params.toString()}`);
	};

	return data.map((lesson) => (
		<button
			onClick={() => clickHandler(lesson.id)}
			className='min-w-full min-h-[74] bg-white rounded-2xl flex items-center mb-2 hover:bg-slate-200 hover:text-[#007ed9] '
			key={lesson.id}
		>
			<span className=' text-[28px] font-semibold text-[#008AD1] px-[20px] '>
				{`${lesson.name}`}
			</span>
		</button>
	));
}
