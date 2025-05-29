'use client';
import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';
import { IuserAnswers, UserResponesTest } from '@/interfaces/userAnswers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useQuestionStore from '@/stores/useQuestionStore';
import isError from '@/lib/api/isError';
import { sendResultTest, updateTestAnswers } from '@/lib/api/test';
import { IattemptStarted } from '@/interfaces/checkingAttempt';
import { useEffect } from 'react';
import MyAlertDialog from '@/components/ui/my-alert-dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';

export default function Test({
	data,
	minutes,
	seconds,
	attemptId,
	attempt
}: {
	data: IListQuestions[];
	minutes?: number;
	seconds?: number;
	attemptId: number;
	attempt?: IattemptStarted;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const selectedAnswers = useQuestionStore((state) => state.selectedAnswers);

	const initializeStore = useQuestionStore((state) => state.initializeStore);

	const setServerData = useQuestionStore((state) => state.setServerData);

	const setNextQuestion = useQuestionStore((state) => state.nextQuestion);

	const clearStore = useQuestionStore((state) => state.clearStore);

	useEffect(() => {
		if (attempt && attempt?.userResponesTest.length > 0) {
			setServerData(attempt.userResponesTest);
			return;
		}
		initializeStore(data);
	}, [attempt, data, initializeStore, setServerData]);

	const updateAnswers = async () => {
		const dataForRequest: IuserAnswers = {
			testId: Number(pathname.match(/\d+/g)?.pop()),
			userResponesTest: selectedAnswers as UserResponesTest[],
			idResult: attemptId
		};
		await updateTestAnswers(dataForRequest);
	};

	const sendAnswers = async () => {
		const dataForRequest: IuserAnswers = {
			testId: Number(pathname.match(/\d+/g)?.pop()),
			userResponesTest: selectedAnswers as UserResponesTest[],
			idResult: attemptId
		};
		const res = await sendResultTest(dataForRequest);
		if (!isError(res)) {
			const params = new URLSearchParams(searchParams);
			params.set('id', `${res.idUserRespones}`);
			params.set('testName', `${res.nameTest}`);
			params.set('result', `${res.result.toFixed(0)}`);
			params.set('evaluationName', `${res.evaluationName}`);
			params.set('attempts', `${res.attempts}`);
			replace(`/student/resultTest?${params.toString()}`);
			clearStore();
		}
	};

	const question = data[currentQuestion];

	//TODO Иногда тест отправляется с ошибкой понять и решить

	return (
		<div className='mx-[80px] flex flex-col justify-between h-full '>
			<div className='flex flex-col overflow-hidden  '>
				<Questiontitle name={question.name} info={question.info} />
				<div className='flex pt-[46px] overflow-hidden justify-between '>
					<ScrollArea className='flex-1 h-full '>
						{question.answers.map((answer) => {
							return (
								<div key={answer.id} className='mb-[20px]'>
									<Answers
										key={answer.id}
										text={answer.answerText}
										index={currentQuestion + 1}
										isSelected={
											selectedAnswers[currentQuestion]
												? !!selectedAnswers[
														currentQuestion
												  ].userRespones?.includes(
														answer.id.toString()
												  )
												: false
										}
										answerId={answer.id.toString()}
										typeQuestion={question.categoryTasks.id}
									/>
								</div>
							);
						})}
					</ScrollArea>
					{question.pathImg.length !== 0 &&
						question.pathImg.map((img, index) => (
							<Image
								src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${img}`}
								width={400}
								height={400}
								alt='изображение к вопросу'
								className='ml-[20px] p-[20px] border-2 border-[#cecece] rounded-xl'
								key={index}
							/>
						))}
				</div>
			</div>
			<div className='flex justify-between py-[20px]'>
				<div className='flex gap-[30px]'>
					<Popover>
						<Timer
							minutes={minutes as number}
							seconds={seconds}
							action={sendAnswers}
						/>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className='p-[10px] rounded-[39px] w-[280px] flex justify-around'
							>
								<p className='text-[28px] '>
									Вопрос {currentQuestion + 1}/{data.length}
								</p>
								<ArrowUp size={36} />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<ListQuestions
								currentQuestion={currentQuestion}
								selectedAnswers={selectedAnswers}
								data={data}
								updateAnswers={updateAnswers}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className='flex justify-end gap-[12px]'>
					{currentQuestion + 1 < data.length && (
						<Button
							size={'medium'}
							onClick={() => {
								setNextQuestion();
								updateAnswers();
							}}
						>
							Следующий вопрос
						</Button>
					)}
					<MyAlertDialog
						triggerText='Завершить тест'
						action={sendAnswers}
						actionText='Да'
						cancelText='Нет'
						titleText='Завершить тест?'
					/>
				</div>
			</div>
		</div>
	);
}
