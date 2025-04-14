import { auth } from '@/auth';
import { ExitButton } from '@/components/ui/exit';

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const name = session?.user.user.name;

	return (
		<div className='bg-white my-10 rounded-[65px] w-[1750px] h-[875px]'>
			<header className='flex justify-between items-center min-h-[75px] pl-[65px] pr-[95px] pt-[80px] '>
				<h1 className='text-[60px] font-semibold text-black'>
					Ваш профиль
				</h1>
				<ExitButton />
			</header>
			<main className='px-[70px] pt-[40px] flex'>
				<div className='flex flex-col'>
					<div className='w-[443px] h-[443px] rounded-full bg-primary flex justify-center items-center'>
						<p className='text-[230px] text-white font-semibold'>
							ЯА
						</p>
					</div>
					<div className='ml-[40px] mt-[66px]'>
						<p className=' text-[40px] font-bold '>
							{name}
						</p>
						<p className='text-[28px] font-semibold'>ТСО-405Б-21</p>
					</div>
				</div>
				<div className='w-[1066px] mx-[85px]'>
					<div className='flex gap-[35px]'>{children}</div>
				</div>
			</main>
		</div>
	);
}
