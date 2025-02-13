import { Check } from 'lucide-react';

export default function ListQuestions({
	length,
	onChangeQuestion,
	currentQuestion,
	selectedAnswers,
	questionIds
}: {
	length: number;
	onChangeQuestion: (to: number) => void;
	currentQuestion: number;
	selectedAnswers: { [questionIndex: string]: string | null };
	questionIds: string[];
}) {
	return (
		<div className='bg-white/20 rounded-xl mt-[16px] w-[280px]'>
			<div className='p-[20px] flex flex-wrap'>
				{(() => {
					const arr = [];
					for (let i = 0; i < length; i++) {
						const questionId = questionIds[i];
						const isAnswered =
							selectedAnswers &&
							selectedAnswers[questionId] !== null &&
							selectedAnswers[questionId] !== undefined;

						arr.push(
							<button
								key={i}
								onClick={() => {
									onChangeQuestion(i);
								}}
								className={`text-[#008AD1]/50 bg-white/60  m-[5px] size-[30px] rounded-sm flex justify-center items-center
									${currentQuestion === i ? 'outline outline-[3px] outline-white' : ''}
									${isAnswered ? 'bg-white/100 text-white' : ''}`}
							>
								{isAnswered ? (
									<Check
										size={20}
										color='#008AD1'
										strokeWidth={3}
									/>
								) : (
									i + 1
								)}
							</button>
						);
					}
					return arr;
				})()}
			</div>
		</div>
	);
}
