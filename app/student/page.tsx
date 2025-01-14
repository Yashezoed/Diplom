import { Button } from '@/components/ui/button';
import { UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import fetchDiscipline from '../api/auth/[...nextauth]/route';
import { ExitButton } from '@/components/ui/exit';

export default async function Page() {
	const data = await fetchDiscipline();

	return (
		<div className='min-h-screen bg-[linear-gradient(120deg,rgba(0,138,209,1)_0%,rgba(0,138,209,0.7)_100%)] flex flex-col'>
			<div className='w-[1200] max-h-[95vh] flex flex-col mx-auto'>
				<header className='p-6 flex justify-between items-center  h-[100] mt-10'>
					<h1 className='text-4xl font-bold text-white'>
						Ваши курсы
					</h1>
					<div className='flex gap-4'>
						<Link href={'/student/profile'}><UserCircle2 className='w-8 h-8 text-white cursor-pointer' /></Link>
						<ExitButton />
					</div>
				</header>
				<div className='grid grid-cols-3 gap-5 max-w-7xl bg-[#008AD1] p-5 rounded-3xl overflow-y-scroll '>
					{data.map((card) => (
						<Button
							asChild
							variant='default'
							className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-slate-200 hover:text-[#007ed9] '
							key={card.id}
						>
						<Link href={'/student/tests'}>{card.name}</Link>
						</Button>
					))}
					<Button
						asChild
						variant='default'
						className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-[#008dd4] hover:text-white border-white border-4'
					>
						<Link href={'/student/tests'}>Test discipline 1</Link>
					</Button>
					<Button
						asChild
						variant='default'
						className='w-[373] h-[126] bg-white text-[#008AD1] text-[32px] font-semibold rounded-3xl hover:bg-slate-200 hover:text-[#007ed9] '
					>
						<Link href={'/student/tests'}>Test discipline 2</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
