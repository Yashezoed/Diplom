import { ILessonDescription } from '@/interfaces/lessonDescription';
import isError from '@/lib/api/isError';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from './button';

export default async function TestDescription(props: {
	data: ILessonDescription;
}) {
	const { infoTest, name, id, discipline, userAttempt } = props.data;
	console.log('Lesson Description ==>' ,props.data);


	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			{isError(props.data) ? (
				<div>
					Status {props.data.status} error messgae{' '}
					{props.data.message}
				</div>
			) : (
				<div className='flex flex-col justify-between max-h-[700px]'>
					<div className='flex flex-col gap-[50px]  relative overflow-hidden rounded-3xl border-2 border-black p-8 text-black mt-10'>
						<div>
							<h2 className='text-[32px] font-semibold'>{`${name}`}</h2>
							<p className='text-[20px] max-w-[586px] break-words'>
								{infoTest}
							</p>
						</div>
						<div className=''>
							<p className='text-[32px] font-semibold'>
								Кол-во попыток: {userAttempt}
							</p>
						</div>
					</div>
					<div className='flex justify-end'>
						<Link href={`/student/${discipline.id}/testId/${id}`}>
							<Button variant='default' size={'lg'}>
								Решать
							</Button>
						</Link>
					</div>
				</div>
			)}
		</Suspense>
	);
}
