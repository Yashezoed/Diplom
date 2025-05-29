'use server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import fetchDisciplines from '@/lib/api/fetchDisciplines';
import FixAuth from '@/lib/api/fixAuth';
import isError from '@/lib/api/isError';
import StudentLayout from '@/components/layout/studentLayout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Discipline() {
	const data = await fetchDisciplines();

	return (
		<StudentLayout>
				{isError(data) ? (
					<div>
						Status {data.status} error messgae {data.message}
					</div>
				) : (
					<>
						<FixAuth />
						<ScrollArea className='h-full py-10 rounded-3xl px-[80px]'>
							<div className='grid grid-cols-3 gap-[64px]'>
								{data.map((card) => (
									<Button
										asChild
										variant='default'
										size={'lg'}
										className='text-[36px] w-full '
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
						</ScrollArea>
					</>
				)}
		</StudentLayout>
	);
}
