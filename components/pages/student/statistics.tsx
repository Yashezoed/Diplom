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
import { useEffect, useState } from 'react';

export default function Statistics({
	data,
	AVGScore,
	results
}: {
	data: ICourse[];
	AVGScore: IAVGScore;
	results: ITestResults[] | IError;
}) {
	const [selectedDiscipline, setSelectedDiscipline] = useState<string>(
		data[0]?.name || ''
	);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const updateDisciplineInURL = (disciplineId: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('disciplineId', disciplineId.toString());
		router.replace(`${pathname}?${params.toString()}`);
	};

	const handleSelectChange = (value: string) => {
		setSelectedDiscipline(value);
		const selectedCourse = data.find((course) => course.name === value);
		if (selectedCourse) {
			updateDisciplineInURL(selectedCourse.id);
		}
	};

	useEffect(() => {
		if (data.length === 0) return;
		const selectedCourse = data.find(
			(course) => course.name === selectedDiscipline
		);
		if (selectedCourse) {
			updateDisciplineInURL(selectedCourse.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className=' mt-[30px] flex flex-col h-[calc(100%-125px)]'>
			<div className='flex items-end justify-between pb-[20px]'>
				<div>
					<p className='text-[28px] mb-[10px] font-medium'>
						Статистика по предмету
					</p>
					<Select
						value={selectedDiscipline}
						onValueChange={handleSelectChange}
					>
						<SelectTrigger>
							<SelectValue placeholder={selectedDiscipline} />
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
					{!isError(results) &&
						results.map((item) => (
							<div
								key={item.idUserRespones}
								className='grid grid-cols-[70px_140px_minmax(150px,1fr)_280px] gap-4 items-center border border-2 rounded-[15px] border-black p-[10px]'
							>
								<span className='text-[24px] font-bold text-center '>
									{item.result.toFixed(0)}%
								</span>
								<p className='text-[24px] font-semibold text-center'>
									{new Date(
										item.dateFinish
									).toLocaleDateString()}
								</p>
								<p className='text-[24px] font-semibold text-center'>
									{item.nameTest}
								</p>
								{/* //TODO  Я не уверен, что так норм передавать парамы */}
								<Link
									href={
										'/student/resultTest?id=' +
										item.idUserRespones +
										'&testName=' +
										item.nameTest +
										'&result=' +
										item.result.toFixed(0) +
										'&isChek=' +
										item.isChek +
										'&evaluationName=' +
										item.evaluationName +
										'&attempts=' +
										item.attempts
									}
								>
									<Button
										size={'sm'}
										className='w-fit px-[10px]'
									>
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
