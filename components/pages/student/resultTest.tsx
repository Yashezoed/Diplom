'use client';

import { Iparams } from '@/app/student/resultTest/page';
import StudentLayout from '@/components/layuout/studentLayout';
import { Button } from '@/components/ui/button';
import { Diagram } from '@/components/ui/pieСhart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IresultTestData } from '@/interfaces/resultTestData';
import Link from 'next/link';

export default function resultTest({
	data,
	params
}: {
	data: IresultTestData;
	params: Iparams;
}) {
	const { testName, result, isChek, evaluationName, id, attempts } = params;
	const numberOfQuestions = data.length;
	const numberOfRightAnswers = data.filter(
		(item) => item.isCorrectQuest
	).length;
	const numberOfWrongAnswers = numberOfQuestions - numberOfRightAnswers;

	const gridColsClass: Record<number, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6'
	};

	const colsClass =
		data.length > 6
			? 'grid-cols-6'
			: gridColsClass[data.length] || 'grid-cols-6';

	return (
		<StudentLayout title={testName}>
			<div className='w-full h-full flex  py-[40px] '>
				<div className='w-[50%] flex flex-col justify-between'>
					<div className='flex justify-between '>
						<Diagram
							numberOfRightAnswers={numberOfRightAnswers}
							numberOfWrongAnswers={numberOfWrongAnswers}
							result={result}
						/>
						<div className='pr-[40px] flex flex-col justify-center'>
							<h2 className='text-[32px] font-bold pb-[10px]'>
								Итог: {numberOfRightAnswers}/{numberOfQuestions}
							</h2>
							<div className='flex items-center gap-[14px] pl-[10px] '>
								<div className='w-[27px] h-[27px] bg-[#8297E5] rounded-full'></div>
								<p className='text-[24px] font-semibold'>
									Правильно: {numberOfRightAnswers}
								</p>
							</div>
							<div className='flex items-center gap-[14px] pl-[10px] '>
								<div className='w-[27px] h-[27px] bg-[#CFCFCF] rounded-full'></div>
								<p className='text-[24px] font-semibold'>
									Неправильно: {numberOfWrongAnswers}
								</p>
							</div>

							<div className='pl-[10px] pt-[10px]'>
								{evaluationName && (
									<p className='text-[30px] font-semibold'>
										Оценка: {evaluationName}
									</p>
								)}
								{!isNaN(Number(attempts)) && (

									<p className='text-[30px] font-semibold'>
										Осталось попыток: {attempts}
									</p>
								)}
							</div>
						</div>
					</div>
					{isChek && (
						<Link
							href={`/student/resultTest/details?testName=${testName}&id=${id}`}
						>
							<Button size={'medium'} className='ml-[70px]'>
								Подробнее
							</Button>
						</Link>
					)}
				</div>

				<div className='w-[50%] border-l-2 border-black overflow-hidden '>
					<ScrollArea className='h-full '>
						<div
							className={`gap-y-[50px] justify-items-center grid ${colsClass}`}
						>
							{data.map((item, index) => (
								<p
									className={`text-[20px] font-semibold w-[55px] h-[55px] flex items-center justify-center rounded-[5px] ${
										item.isCorrectQuest
											? 'bg-[#8297E5]'
											: 'bg-[#CFCFCF]'
									}`}
									key={item.questDto.id}
								>
									{index + 1}
								</p>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</StudentLayout>
	);
}
