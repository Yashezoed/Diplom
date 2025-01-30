import Answers from '@/components/ui/answers';
import ListQuestions from '@/components/ui/listQuestions';
import Questiontitle from '@/components/ui/questionTitle';
import Timer from '@/components/ui/timer';
import { IListQuestions } from '@/interfaces/listQuestions';

export default function Test({
	data
} : {
	data : IListQuestions[]
}) {
	console.log(data);

	return (
		<div className='mx-4'>
			<Questiontitle  name={data[0].name} info={data[0].info}/>
			<div className='flex'>
				<Answers />
				<div className='flex '>
					<Timer />
					<ListQuestions/>
				</div>
			</div>
		</div>
	);
}
