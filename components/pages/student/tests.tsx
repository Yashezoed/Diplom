'use client';
import { Button } from '@/components/ui/button';
import { ITest } from '@/interfaces/test';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Tests(props: { data: ITest[] }) {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('test-storage');
	}

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
		<Button
			onClick={() => clickHandler(lesson.id)}
			variant={'outline'}
			size={'xl'}
			key={lesson.id}

		>
			<span className='text-wrap'>{lesson.name}</span>
		</Button>
	));
}
