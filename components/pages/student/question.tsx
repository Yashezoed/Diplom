'use client';
import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IQuestionStore {
	currentQuestion: number;
	nextQuestion: () => void;
	changeCurrentQuestion: (to: number) => void;
}

const useQuestionStore = create<IQuestionStore>()(
	persist(
		immer((set) => ({
			currentQuestion: 0,
			nextQuestion: () =>
				set((state) => {
					state.currentQuestion += 1;
				}),
			changeCurrentQuestion: (to: number) =>
				set((state) => {
					state.currentQuestion = to;
				})
		})),
		{
			name: 'question-storage'
		}
	)
);
export default function Test({ data }: { data: IListQuestions[] }) {
	// console.log('data =>', data[1]);
	console.log('data =>', data);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const setNextQuestion = useQuestionStore((state) => state.nextQuestion);
	const changeCurrentQuestion = useQuestionStore((state) => state.changeCurrentQuestion);

	return (
		<div className='mx-4 mt-[50px]'>
			<Questiontitle
				name={data[currentQuestion].name}
				info={data[currentQuestion].info}
			/>
			<div className='flex justify-between mt-[46px]'>
				<div className='flex flex-col  gap-[16px] w-[90%] '>
					{data[currentQuestion].answers.map((answer, index) => (
						<Answers
							key={index}
							text={answer.answerText}
							index={index}
						/>
					))}
				</div>
				<div className='w-[315px] h-[375px] ml-[48px]'>
					<Timer />
					<ListQuestions
						length={data.length}
						onChangeQuestion={changeCurrentQuestion}
					/>
				</div>
			</div>
			<div className='flex justify-end gap-[12px]'>
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
