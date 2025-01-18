import { Button } from '@/components/ui/button';
import { UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ExitButton } from '@/components/ui/exit';
import { Suspense } from 'react';
import fetchDisciplines from '@/lib/api/fetchDisciplines';
import FixAuth from '@/lib/api/fixAuth';
import isError from '@/lib/api/isError';

export default async function Discipline() {
	const data = await fetchDisciplines();

	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			{isError(data) ? (
				<div>Status { data.status} error messgae {data.message}</div>
			) : (
				<>
					<FixAuth/>
					<header className='flex justify-between items-center h-[75px]  mt-10'>
						<h1 className='text-4xl font-bold text-white'>
							Ваши курсы
						</h1>
						<div className='flex gap-4'>
							<Link href={'/student/profile'}>
								<UserCircle2 className='w-8 h-8 text-white cursor-pointer' />
							</Link>
							<ExitButton />
						</div>
					</header>
					<div className='grid grid-cols-3 gap-5 max-w-7xl bg-[#008AD1] p-5 rounded-3xl overflow-x-hidden overflow-y-scroll mt-10 '>
						{data.map((card) => (
							<Button
								asChild
								variant='default'
								className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-slate-200 hover:text-[#007ed9] '
								key={card.id}
							>
								<Link href={{pathname: `/student/tests/${card.id}`,
											query: {
												id: card.id,
												title: card.name
											}}}
											>{card.name}
								</Link>
							</Button>
						))}
					</div>
				</>
			)}
		</Suspense>
	);
}
