'use client';
import { IListQuestions } from '@/interfaces/listQuestions';
import useQuestionStore, { IAnswer } from '@/stores/useQuestionStore';
import { Check } from 'lucide-react';

export default function ListQuestions({
	currentQuestion,
	selectedAnswers,
	data
}: {
	currentQuestion: number;
	selectedAnswers: IAnswer[];
	data: IListQuestions[];
}) {
	const changeCurrentQuestion = useQuestionStore(
		(state) => state.changeCurrentQuestion
	);




	return (
		<div className='bg-white/20 rounded-xl mt-[16px] w-[280px]'>
			<div className='p-[20px] flex flex-wrap'>
				{data.map((answers, index) => {
					console.log('DATA +>>',data);
					console.log('currentQuestion +>>', currentQuestion);
					console.log('selectedAnswers +>>', selectedAnswers);

					return (
						<button
							key={answers.id}
							onClick={() => {
								changeCurrentQuestion(index, data[index].id.toString());
							}}
							className={`text-[#008AD1]/50 bg-white/60  m-[5px] size-[30px] rounded-sm flex justify-center items-center
									${currentQuestion === index ? 'outline outline-[3px] outline-white' : ''}
									${selectedAnswers[answers.id] !== null ? '!bg-white/100 text-white' : ''}`}
						>
							{selectedAnswers[answers.id] !== null ? (
								<Check
									size={20}
									color='#008AD1'
									strokeWidth={3}
								/>
							) : (
								index + 1
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
