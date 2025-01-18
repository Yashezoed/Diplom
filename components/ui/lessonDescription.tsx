import fetchLesson from '@/lib/api/fetchLessonDescription';
import isError from '@/lib/api/isError';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function LessonDescription(props: { id: number }) {
	const data = await fetchLesson(props);

	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			{isError(data) ? (
				<div>
					Status {data.status} error messgae {data.message}
				</div>
			) : (
				<div className='max-h-[95vh]'>
					<div className='relative w-[650px] max-h-[580px] max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-b from-[rgba(0,138,209,1)] to-[rgba(0,138,209,0.7)] p-8 text-white mt-10'>
						<div className='max-w-2xl '>
							<h2 className='text-[28px] font-medium'>{`Урок ${data.id}. ${data.name}`}</h2>
							<p className='text-lg/relaxed max-w-[586px] break-words'>
								{data.infoTest}
							</p>
						</div>
						<div className=' flex justify-end'>
							<Link href={'#'}>
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
