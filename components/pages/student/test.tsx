'use client';
import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';
import { IuserAnswers } from '@/interfaces/userAnswers';
import sendResultTest from '@/lib/api/sendResultTest';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import useQuestionStore from '@/stores/useQuestionStore';
import isError from '@/lib/api/isError';

export default function Test({
	data,
	time
}: {
	data: IListQuestions[];
	time?: number;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const selectedAnswers = useQuestionStore((state) => state.selectedAnswers);
	const currentQuestionId = useQuestionStore(
		(state) => state.currentQuestionId
	);

	const setCurrentQuestionId = useQuestionStore(
		(state) => state.setCurrentQuestionId
	);
	const setNextQuestion = useQuestionStore((state) => state.nextQuestion);

	const initializeSelectedAnswers = useQuestionStore(
		(state) => state.initializeSelectedAnswers
	);
	//modal
	const isModalOpen = useQuestionStore((state) => state.isModalOpen);
	const openModal = useQuestionStore((state) => state.openModal);
	const closeModal = useQuestionStore((state) => state.closeModal);

	useEffect(() => {
		setCurrentQuestionId(data[currentQuestion].id.toString());
	}, [currentQuestion, data, setCurrentQuestionId]);

	// Создаем массив questionIds с использованием useMemo, чтобы он не пересоздавался при каждом рендере
	const questionIds = useMemo(() => {
		return data.map((question) => question.id.toString());
	}, [data]);

	useEffect(() => {
		const storage = localStorage.getItem('test-storage');

		if (storage !== null) {
			const selectedAnswers = JSON.parse(storage).state.selectedAnswers;
			console.log(selectedAnswers);

			if (Object.keys(selectedAnswers).length === 0) {
				initializeSelectedAnswers(questionIds);
			}
		}
	}, [initializeSelectedAnswers, questionIds, selectedAnswers]);

	const sendAnswers = async () => {
		const dataForRequest: IuserAnswers = {
			testId: Number(pathname.split('/').pop()),
			userResponesTest: Object.entries(selectedAnswers).map(
				([questionId, answerId]) => ({
					questId: Number(questionId),
					userRespones: [answerId]
				})
			)
		};
		console.log(dataForRequest);
		const res = await sendResultTest(dataForRequest);
		if (!isError(res)) {
			const params = new URLSearchParams(searchParams);
			params.set('resultId', `${res.idAttempts}`);
			params.set('result', `${res.result}`);
			params.set('evaluationName', `${res.evaluationName}`);
			replace(`${pathname}/resultTest?${params.toString()}`);
			closeModal();
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
						const isSelected =
							selectedAnswers[currentQuestionId] ===
							answer.id.toString();
						return (
							<Answers
								key={answer.id}
								text={answer.answerText}
								index={index + 1}
								isSelected={isSelected}
								answerId={answer.id.toString()}
							/>
						);
					})}
				</div>
				<div className='w-[315px] h-[375px] ml-[48px]'>
					{typeof time === 'number' ? (
						<Timer time={time} action={sendAnswers} />
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
						onClick={setNextQuestion}
					>
						Следующий вопрос
					</button>
				)}
				<button
					className='bg-[#008AD1] text-white rounded-xl p-[16px] text-[20px] font-semibold'
					onClick={openModal}
				>
					Завершить тест
				</button>
				{isModalOpen && (
					// TODO использовать модальное окно из shadcnui
					<div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
						<div className='bg-white p-4 rounded-3xl w-[800px] h-[300px] flex flex-col items-center'>
							<p className='mt-[75px] text-[48px] text-[#008AD1]'>
								Завершить тест?
							</p>
							<div className='flex gap-[56px] mt-[40px]'>
								<button
									className='w-[300px] h-[50px] flex items-center justify-center border-4 border-[#008AD1] bg-[#008AD1] hover:bg-[#0096e0] hover:border-[#0096e0] text-white text-[24px] font-500 py-2 px-4 rounded-2xl'
									onClick={sendAnswers}
								>
									<span>Да</span>
								</button>
								<button
									className='w-[300px] h-[51px] flex items-center justify-center bg-white hover:bg-slate-100 text-[#008AD1] text-[24px] font-500 border-4 border-[#008AD1] py-2 px-4 rounded-2xl'
									onClick={closeModal}
								>
									Нет
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
