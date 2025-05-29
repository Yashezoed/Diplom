import { auth } from '@/auth';
import { ExitButton } from '@/components/ui/exit';
import { IInfoStudent } from '@/interfaces/infoStudent';
import { getInfoStudent } from '@/lib/api/studentProfile';

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	const name = session?.user.user.name;
	const infoStudent = (await getInfoStudent()) as IInfoStudent;
	const group = infoStudent.name;

	return (
		<div className='bg-white rounded-[30px] p-[30px] w-full h-full flex-1 overflow-hidden'>
			<header className='flex justify-between items-center max-h-[165px]  '>
				<h1 className='text-[48px] font-semibold text-black'>
					Ваш профиль
				</h1>
				<ExitButton />
			</header>
			<main className='flex justify-around pt-[60px] h-[calc(100%-150px)]'>
				<div className='flex flex-col justify-between'>
					<div className='w-[400px] h-[400px] rounded-full bg-primary flex justify-center items-center'>
						<p className='text-[200px] text-white font-semibold'>
							{name &&
								name
									.split(' ')
									.slice(0, 2)
									.map((word) => word[0].toLocaleUpperCase())}
						</p>
					</div>
					<div className='mt-[50px]'>
						<p className=' text-[40px] font-bold '>{name}</p>
						<p className='text-[28px] font-semibold'>{group}</p>
					</div>
				</div>
				{children}
			</main>
		</div>
	);
}
