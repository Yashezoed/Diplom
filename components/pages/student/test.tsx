'use client';
import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';
import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IQuestionStore {
	currentQuestion: number;
	currentQuestionId: string
	selectedAnswers: { [questionIndex: string]: string | null }; // Объект для хранения выбранных ответов
	nextQuestion: () => void;
	changeCurrentQuestion: (to: number) => void;
	selectAnswer: (answerId: number) => void;
	setCurrentQuestionId: (id: string) => void;
}

const useQuestionStore = create<IQuestionStore>()(
	persist(
		immer((set, get) => ({
			currentQuestion: 0,
			currentQuestionId: '',
			selectedAnswers: {}, // Изначально нет выбранных ответов
			nextQuestion: () =>
				set((state) => {
					state.currentQuestion += 1;
				}),
			changeCurrentQuestion: (to: number) =>
				set((state) => {
					state.currentQuestion = to;
				}),
			selectAnswer: (answerId: number) =>
				set((state) => {
					const questionId = get().currentQuestionId;
					state.selectedAnswers[questionId] = answerId.toString(); // Сохраняем answerId для текущего вопроса
				}),
			setCurrentQuestionId: (id: string) => set({ currentQuestionId: id })
		})),
		{
			name: 'test-storage'
		}
	)
);

export default function Test({ data }: { data: IListQuestions[] }) {
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const selectedAnswers = useQuestionStore((state) => state.selectedAnswers);
	const currentQuestionId = useQuestionStore((state) => state.currentQuestionId);

	const setCurrentQuestionId = useQuestionStore((state) => state.setCurrentQuestionId);
	const setNextQuestion = useQuestionStore((state) => state.nextQuestion);
	const changeCurrentQuestion = useQuestionStore((state) => state.changeCurrentQuestion);
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	useEffect(() => {
		setCurrentQuestionId(data[currentQuestion].id.toString());
	}, [currentQuestion, data, setCurrentQuestionId]);


	return (
		<div className='mx-4 mt-[50px]'>
			<Questiontitle
				name={data[currentQuestion].name}
				info={data[currentQuestion].info}
			/>
			<div className='flex justify-between mt-[46px]'>
				<div className='flex flex-col  gap-[16px] w-[90%] '>
					{data[currentQuestion].answers.map((answer, index) => {
						const isSelected = selectedAnswers[currentQuestionId] === answer.id.toString(); // Проверяем, выбран ли этот ответ для текущего вопроса
						return (
							<Answers
								key={answer.id}
								text={answer.answerText}
								index={index + 1}
								isSelected={isSelected}
								onSelect={() => selectAnswer(answer.id)}
							/>
						);
					})}
				</div>
				<div className='w-[315px] h-[375px] ml-[48px]'>
					<Timer />
					<ListQuestions
						length={data.length}
						onChangeQuestion={changeCurrentQuestion}
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
				<button className='bg-[#008AD1] text-white rounded-xl p-[16px] text-[20px] font-semibold'>
					Завершить тест
				</button>
			</div>
		</div>
	);
}
