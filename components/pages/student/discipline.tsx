import { Button } from '@/components/ui/button';
import { UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ExitButton } from '@/components/ui/exit';
import { Suspense } from 'react';
import fetchDisciplines from '@/lib/api/disciplines';
import FixAuth from '@/lib/api/fixAuth';

export default async function Discipline() {
	const data = await fetchDisciplines();
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			{'error' in data ? (
				<div>{/* {data.error} */}sdsd</div>
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
						{/* {data.map((card) => (
							<Button
								asChild
								variant='default'
								className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-slate-200 hover:text-[#007ed9] '
								key={card.id}
							>
								<Link href={'/student/tests'}>{card.name}</Link>
							</Button>
						))} */}
						<Button
							asChild
							variant='default'
							className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-[#008dd4] hover:text-white border-white border-4'
						>
							<Link href={'/student/tests'}>
								Test discipline 1
							</Link>
						</Button>
						<Button
							asChild
							variant='default'
							className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-slate-200 hover:text-[#007ed9] '
						>
							<Link href={'/student/tests'}>
								Test discipline 2
							</Link>
						</Button>
					</div>
				</>
			)}
		</Suspense>
	);
}
