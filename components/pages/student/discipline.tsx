import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import fetchDisciplines from '@/lib/api/fetchDisciplines';
import FixAuth from '@/lib/api/fixAuth';
import isError from '@/lib/api/isError';
import StudentLayout from '@/components/layuout/studentLayout';

export default async function Discipline() {
	const data = await fetchDisciplines();

	return (
		<StudentLayout>
			<Suspense fallback={<div>Загрузка...</div>}>
				{isError(data) ? (
					<div>
						Status {data.status} error messgae {data.message}
					</div>
				) : (
					<>
						<FixAuth />
						<div className='grid grid-cols-3 gap-5 max-w-7xl bg-[#008AD1] p-5 rounded-3xl overflow-x-hidden overflow-y-scroll mt-10 '>
							{data.map((card) => (
								<Button
									asChild
									variant='default'
									className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-slate-200 hover:text-[#007ed9] '
									key={card.id}
								>
									<Link
										href={{
											pathname: `/student/${card.id}/tests`
										}}
									>
										{card.name}
									</Link>
								</Button>
							))}
						</div>
					</>
				)}
			</Suspense>
		</StudentLayout>
	);
}
