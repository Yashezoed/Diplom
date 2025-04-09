'use server'
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
						<div className='grid grid-cols-3 gap-[64px] px-[74px] py-10 rounded-3xl overflow-x-hidden overflow-y-scroll  max-h-[100vh] '>
							{data.map((card) => (
								<Button
									asChild
									variant='default'
									size={'lg'}
									className='text-[36px] '
									key={card.id}
								>
									<Link
										href={{
											pathname: `/student/${card.id}`
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
