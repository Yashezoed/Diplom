import { ILessonDescription } from '@/interfaces/lessonDescription';
import isError from '@/lib/api/isError';
import Link from 'next/link';
import { Button } from './button';
import { ScrollArea } from './scroll-area';

export default async function TestDescription(props: {
	data: ILessonDescription;
}) {
	const { infoTest, name, id, discipline, userAttempt } = props.data;

	return (
		<>
			{isError(props.data) ? (
				<div>
					Status {props.data.status} error messgae{' '}
					{props.data.message}
				</div>
			) : (
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col overflow-hidden rounded-3xl border-2 border-black p-8 text-black '>
						<h2 className='text-[32px] font-semibold'>{`${name}`}</h2>
						<ScrollArea>
							<p className='text-[20px] w-[586px] break-words'>
								{infoTest}
							</p>
						</ScrollArea>
						{userAttempt && (
							<div className=''>
								<p className='text-[32px] font-semibold'>
									Попыток осталось {userAttempt}
								</p>
							</div>
						)}
					</div>
					<div className='flex justify-end '>
						<Link href={`/student/${discipline.id}/testId/${id}`}>
							<Button variant='default' size={'lg'}>
								Решать
							</Button>
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
