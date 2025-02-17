import { ILessonDescription } from '@/interfaces/lessonDescription';
import isError from '@/lib/api/isError';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function TestDescription(props: {data: ILessonDescription}) {
	const { infoTest, name, id, discipline } = props.data;


	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			{isError(props.data) ? (
				<div>
					Status {props.data.status} error messgae {props.data.message}
				</div>
			) : (
				<div className='max-h-[95vh]'>
					<div className='relative w-[650px] max-h-[580px] max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-b from-[rgba(0,138,209,1)] to-[rgba(0,138,209,0.7)] p-8 text-white mt-10'>
						<div className='max-w-2xl '>
							<h2 className='text-[28px] font-medium'>{`${name}`}</h2>
							<p className='text-lg/relaxed max-w-[586px] break-words'>
								{infoTest}
							</p>
						</div>
						<div className=' flex justify-end'>
							<Link href={`/student/${discipline.id}/testId/${id}`}>
								<button className='rounded-lg bg-white px-6 py-3 text-[#008AD1] text-[20px] font-semibold hover:bg-slate-200 hover:text-[#007ed9] mt-3'>
									Пройти тест
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</Suspense>
	);
}
