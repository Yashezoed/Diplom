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

	const setNextQuestion = useQuestionStore((state) => state.nextQuestion);

	const clearStore = useQuestionStore((state) => state.clearStore);

	useEffect(() => {
		if (attempt && attempt?.userResponesTest.length > 0) {
			return;
		}
		initializeStore(data);
	}, [attempt, data, initializeStore]);

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
		console.log('res=======>', res);
		clearStore();

		if (!isError(res)) {
			const params = new URLSearchParams(searchParams);
			params.set('idUserRespones', `${res.idUserRespones}`);
			params.set('result', `${res.result}`);
			params.set('evaluationName', `${res.evaluationName}`);
			params.set('attempts', `${res.attempts}`);
			clearStore();
			replace(`${pathname}/resultTest?${params.toString()}`);
		}
	};

	return (
		<div className='mx-[80px] mt-[40px]'>
			<Questiontitle
				name={data[currentQuestion].name}
				info={data[currentQuestion].info}
			/>
			<div className='flex justify-between mt-[46px]'>
				<div className='flex flex-col  gap-[16px] w-[80%] '>
					{data[currentQuestion].answers.map((answer, index) => {
						return (
							<Answers
								key={answer.id}
								text={answer.answerText}
								index={index + 1}
								isSelected={
									selectedAnswers[currentQuestion]
										? Number(
												selectedAnswers[currentQuestion]
													.userRespones
										  ) === answer.id
										: false
								}
								answerId={answer.id.toString()}
							/>
						);
					})}
				</div>
				<div className='w-[315px] h-[375px] ml-[48px]'>
					{typeof minutes === 'number' ? (
						<Timer
							minutes={minutes}
							seconds={seconds}
							action={sendAnswers}
						/>
					) : (
						''
					)}
					<ListQuestions
						currentQuestion={currentQuestion}
						selectedAnswers={selectedAnswers}
						data={data}
						updateAnswers={updateAnswers}
					/>
				</div>
			</div>
			<div className='flex justify-end gap-[12px] mt-[15px] pb-[28px]'>
				{currentQuestion + 1 < data.length && (
					<Button
						className='rounded-[39px] p-[16px] px-[30px] text-[25px] font-medium '
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
	);
}
