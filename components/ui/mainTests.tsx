
import { ScrollArea } from '@/components/ui/scroll-area';
import LessonDescription from './lessonDescription';
import Lessons from './lessons';
import { ITest } from '@/interfaces/test';

export default function MainTests(props: {data: ITest[]}) {
	console.log(props.data)
	return (
		<div className='flex justify-between'>
			<ScrollArea className='h-[90vh] w-[460px] mt-10 ' >
				<Lessons data={props.data} />
			</ScrollArea>
			
			<LessonDescription id={1} />
		</div>
	);
}