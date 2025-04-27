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
import { IError } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import { ITestResults } from '@/interfaces/testResults';
import isError from '@/lib/api/isError';
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
	results: ITestResults[] | IError;
}) {
	const [value, setValue] = useState(data[0]?.name);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const clickHandler = (testId: number) => {
		const params = new URLSearchParams(searchParams);
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
			<ScrollArea className='max-w-[1069px]'>
				<div className='flex flex-col gap-[25px]'>
					{!isError(results) && results.map((item) => (
						<div
							key={item.idUserRespones}
							className='grid grid-cols-[70px_140px_minmax(150px,1fr)_280px] gap-4 items-center border border-2 rounded-[15px] border-black p-[10px]'
						>
							<span className='text-[24px] font-bold text-center '>
								{item.result.toFixed(0)}%
							</span>
							<p className='text-[24px] font-semibold text-center'>
								{new Date(item.dateFinish).toLocaleDateString()}
							</p>
							<p className='text-[24px] font-semibold text-center'>
								{item.nameTest}
							</p>

							<Link
								href={
									'/student/resultTest?id=' +
									item.idUserRespones +
									'&testName=' +
									item.nameTest
								}

							>
								<Button size={'sm'} className='w-fit px-[10px]'>
									Смотреть результат
								</Button>
							</Link>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
