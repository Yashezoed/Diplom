'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectItem
} from '@/components/ui/select';
import { IAVGScore } from '@/interfaces/AVGScore';
import { ICourse } from '@/interfaces/course';
import { ITestResults } from '@/interfaces/testResults';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Statistics({
	data,
	AVGScore,
	results
}: {
	data: ICourse[];
	AVGScore: IAVGScore;
	results: ITestResults[];
}) {
	const [value, setValue] = useState(data[0]?.name);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const clickHandler = (testId: number) => {
		const params = new URLSearchParams(searchParams);
		console.log('clickHandler triggered with testId:', testId);
		params.set('disciplineId', `${testId}`);
		replace(`${pathname}?${params.toString()}`);
	};

	const onValueChange = (selectedValue: string) => {
		setValue(selectedValue);
		const selectedItem = data.find((item) => item.name === selectedValue);
		if (selectedItem) {
			clickHandler(selectedItem.id);
		}
	};

	return (
		<div className=' mt-[30px] flex flex-col h-[calc(100%-125px)]'>
			<div className='flex items-end justify-between pb-[20px]'>
				<div>
					<p className='text-[28px] mb-[10px] font-medium'>
						Статистика по предмету
					</p>
					<Select value={value} onValueChange={onValueChange}>
						<SelectTrigger>
							<SelectValue placeholder={value} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{data.map((item) => (
									<SelectItem key={item.id} value={item.name}>
										{item.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<p className='text-[36px] font-medium text-wrap'>
					Средний результат {AVGScore.result.toFixed(0)}%
				</p>
			</div>
			<ScrollArea className=''>
				<div className='flex flex-col gap-[25px]'>
					{results.map((item) =>
						item.result.map((test) => (
							<div
								key={test.idUserRespones}
								className='flex justify-around items-center border border-2 rounded-[15px] border-black py-[10px]'
							>
								<p className='text-[36px] font-bold '>
									{test.result.toFixed(0)}%
								</p>
								<p
									className='text-[24px] font-semibold
								// TODO переделать данныe'
								>
									01.01.2024
								</p>
								<p className='text-[24px] font-semibold'>
									Тест №{test.idUserRespones}
								</p>
								<Link href={'/student/resultTest?id=' + test.idUserRespones + '&testName=' + item.test.name}>
									<Button size={'sm'}>
										Смотреть результат
									</Button>
								</Link>
							</div>
						))
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
