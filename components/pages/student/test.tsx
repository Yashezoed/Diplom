'use client';
import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';
import { useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IQuestionStore {
	currentQuestion: number;
	currentQuestionId: string;
	selectedAnswers: { [questionIndex: string]: string | null }; // Объект для хранения выбранных ответов
	nextQuestion: () => void;
	changeCurrentQuestion: (to: number) => void;
	selectAnswer: (answerId: number) => void;
	setCurrentQuestionId: (id: string) => void;
	//modal
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
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
			setCurrentQuestionId: (id: string) =>
				set({ currentQuestionId: id }),
			//modal
			isModalOpen: false,
			openModal: () => set({ isModalOpen: true }),
			closeModal: () => set({ isModalOpen: false })
		})),
		{
			name: 'test-storage'
		}
	)
);

export default function Test({ data }: { data: IListQuestions[] }) {
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const selectedAnswers = useQuestionStore((state) => state.selectedAnswers);
	const currentQuestionId = useQuestionStore(
		(state) => state.currentQuestionId
	);

	const setCurrentQuestionId = useQuestionStore(
		(state) => state.setCurrentQuestionId
	);
	const setNextQuestion = useQuestionStore((state) => state.nextQuestion);
	const changeCurrentQuestion = useQuestionStore(
		(state) => state.changeCurrentQuestion
	);
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

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
						currentQuestion={currentQuestion}
						selectedAnswers={selectedAnswers}
						questionIds={questionIds}
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
					<div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
						<div className='bg-white p-4 rounded-3xl w-[800px] h-[300px] flex flex-col items-center'>
							<p className='mt-[75px] text-[48px] text-[#008AD1]'>
								Завершить тест?
							</p>
							<div className='flex gap-[56px] mt-[40px]'>
								<button
									className='w-[300px] h-[50px] items-center border-4 border-[#008AD1] bg-[#008AD1] hover:bg-[#0096e0] hover:border-[#0096e0] text-white text-[24px] font-500 py-2 px-4 rounded-2xl'
									onClick={closeModal}
								>
									<span>Да</span>
								</button>
								<button
									className='w-[300px] h-[51px] bg-white hover:bg-slate-100 text-[#008AD1] text-[24px] font-500 border-4 border-[#008AD1] py-2 px-4 rounded-2xl'
									onClick={() => {
										// Действия по завершению теста
										closeModal();
									}}
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
