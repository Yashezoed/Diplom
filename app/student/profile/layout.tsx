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

	console.log('infoStudent =>', infoStudent);

	return (
		<div className='bg-white rounded-[65px] w-full h-full flex-1 overflow-hidden'>
			<header className='flex justify-between items-center max-h-[165px] pl-[65px] pr-[95px] pt-[60px]  '>
				<h1 className='text-[60px] font-semibold text-black'>
					Ваш профиль
				</h1>
				<ExitButton />
			</header>
			<main className='flex justify-around pt-[60px] h-[calc(100%-150px)]'>
				<div className='flex flex-col'>
					<div className='w-[400px] h-[400px] rounded-full bg-primary flex justify-center items-center'>
						<p className='text-[230px] text-white font-semibold'>
							{name &&
								name
									.split(' ')
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
