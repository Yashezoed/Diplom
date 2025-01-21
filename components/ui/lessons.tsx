import { ITest } from '@/interfaces/test';
// import { selectLesson } from '../pages/tests';

export default function Lessons(props: { data: ITest[]}) {

	const data = props.data;

	return (
		<form>
			{data.map((lesson) => (
				<button
					
					className='min-w-full min-h-[74] bg-white rounded-2xl flex items-center mb-2 hover:bg-slate-200 hover:text-[#007ed9] '
					key={lesson.id}
				>
					<p className=' text-[28px] font-semibold text-[#008AD1] px-[20px] '>
						{`Урок ${lesson.id}. ${lesson.name}`}
					</p>
				</button>
			))}
		</form>
	);
}
