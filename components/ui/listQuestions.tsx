'use client';
import { IListQuestions } from '@/interfaces/listQuestions';
import useQuestionStore, { IAnswer } from '@/stores/useQuestionStore';
import { Check } from 'lucide-react';

export default function ListQuestions({
	currentQuestion,
	selectedAnswers,
	data,
	updateAnswers
}: {
	currentQuestion: number;
	selectedAnswers: IAnswer[];
	data: IListQuestions[];
	updateAnswers: () => Promise<void>
}) {
	const changeCurrentQuestion = useQuestionStore(
		(state) => state.changeCurrentQuestion
	);

	return (
		<div className='w-[280px] gap-y-[10px] grid grid-cols-5 justify-items-center '>
			{data.map((answers, index) => {
				return (
					<button
						key={answers.id}
						onClick={() => {
							changeCurrentQuestion(
								index,
								data[index].id.toString()
							);
							updateAnswers();
						}}
						className={`text-[#fff] bg-[#5D5D5D]  m-[5px] size-[30px] rounded-sm flex justify-center items-center
									${
										currentQuestion === index
											? 'outline outline-[3px] outline-primary outline-offset-[2px]'
											: ''
									}
									${
										selectedAnswers[index] &&
										selectedAnswers[index].userRespones !==
											null
											? '!bg-[#D4D4D4] text-black'
											: ''
									}`}
					>
						{selectedAnswers[index] &&
						selectedAnswers[index].userRespones !== null ? (
							<Check size={20} color='#000' strokeWidth={3} />
						) : (
							index + 1
						)}
					</button>
				);
			})}
		</div>
	);
}
