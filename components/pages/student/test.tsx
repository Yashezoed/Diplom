'use client';
import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';
import { IuserAnswers } from '@/interfaces/userAnswers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useQuestionStore from '@/stores/useQuestionStore';
import isError from '@/lib/api/isError';
import { sendResultTest } from '@/lib/api/test';
import { IattemptStarted } from '@/interfaces/checkingAttempt';
import { useEffect } from 'react';
import MyAlertDialog from '@/components/ui/my-alert-dialog';

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

	const updateSelectedAnswers = useQuestionStore(
		(state) => state.updateSelectedAnswers
	);
	const clearStore = useQuestionStore((state) => state.clearStore);

	console.log(data);

	const questionIds = data.map((question) => question.id.toString());

	console.log(questionIds);

	console.log('selectedAnswers =>', selectedAnswers);

	console.log('attempt =>', attempt);

	useEffect(() => {
		if (attempt && attempt?.userResponesTest.length > 0) {
			return;
		}
		initializeStore(data);
	}, [attempt, data, initializeStore]);
	// useEffect(() => {
	// 	const updateAnswers = async () => {
	// 		const dataForRequest: IuserAnswers = {
	// 			testId: Number(pathname.split('/').pop()),
	// 			userResponesTest: Object.entries(selectedAnswers).map(
	// 				([questionId, answerId]) => ({
	// 					questId: Number(questionId),
	// 					userRespones: [answerId]
	// 				})
	// 			),
	// 			idResult: attemptId
	// 		};

	// 		console.log(dataForRequest);
	// 		await updateTestAnswers(dataForRequest);
	// 	};
	// 	updateAnswers();
	// }, [attemptId, pathname, selectedAnswers]);


	// const questionIds = useMemo(() => {
	// 	return data.map((question) => question.id.toString());
	// }, [data]);

	// useEffect(() => {
	// 	setCurrentQuestionId(data[currentQuestion].id.toString());
	// }, [currentQuestion, data, setCurrentQuestionId]);

	// useEffect(() => {
	// 	const storage = localStorage.getItem('test-storage');

	// 	if (storage !== null) {
	// 		const storedState = JSON.parse(storage).state;
	// 		const storedSelectedAnswers = storedState.selectedAnswers;

	// 		if (attempt && attempt.userResponesTest.length > 0) {
	// 			const newSelectedAnswers: {
	// 				[questionIndex: string]: string | null;
	// 			} = {};

	// 			attempt.userResponesTest.forEach((item) => {
	// 				newSelectedAnswers[item.questId.toString()] =
	// 					item.userRespones[0];
	// 			});

	// 			updateSelectedAnswers(newSelectedAnswers);
	// 		} else if (Object.keys(storedSelectedAnswers).length === 0) {
	// 			initializeSelectedAnswers(questionIds);
	// 		}
	// 	}
	// }, [
	// 	attempt,
	// 	initializeSelectedAnswers,
	// 	questionIds,
	// 	updateSelectedAnswers
	// ]);



	const sendAnswers = async () => {
		const dataForRequest: IuserAnswers = {
			testId: Number(pathname.split('/').pop())
			// userResponesTest: Object.entries(selectedAnswers).map(
			// 	([questionId, answerId]) => ({
			// 		questId: Number(questionId),
			// 		userRespones: [answerId]
			// 	})
			// ),
			// idResult: attemptId
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
		<div className='mx-4 mt-[50px]'>
			<Questiontitle
				name={data[currentQuestion].name}
				info={data[currentQuestion].info}
			/>
			<div className='flex justify-between mt-[46px]'>
				<div className='flex flex-col  gap-[16px] w-[90%] '>
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
					/>
				</div>
			</div>
			<div className='flex justify-end gap-[12px] mt-[15px]'>
				{currentQuestion + 1 < data.length && (
					<button
						className='bg-white/80 text-[#008AD1] rounded-xl p-[16px] text-[20px] font-semibold'
						onClick={() => {setNextQuestion()}}
					>
						Следующий вопрос
					</button>
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
