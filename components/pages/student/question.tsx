import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';

export default function Test({ data }: { data: IListQuestions[] }) {
	console.log('data =>', data[1]);

	return (
		<div className='mx-4 mt-[50px]'>
			<Questiontitle name={data[1].name} info={data[1].info} />
			<div className='flex justify-between'>
				<div className='flex flex-col mt-[46px] gap-[16px] w-[90%] '>
					{data[1].answers.map((answer, index) => (
						<Answers
							key={index}
							text={answer.answerText}
							index={index}
						/>
					))}
				</div>
				<div className='w-[315px] h-[375px] ml-[48px]'>
					<Timer />
					<ListQuestions length={data.length} />
				</div>
			</div>
			<div className='flex justify-end gap-[12px]'>
				<button className='bg-white/80 text-[#008AD1] rounded-xl p-[16px] text-[20px] font-semibold'>
					Следующий вопрос
				</button>
				<button className='bg-[#008AD1] text-white rounded-xl p-[16px] text-[20px] font-semibold'>
					Завершить тест
				</button>
			</div>
		</div>
	);
}
