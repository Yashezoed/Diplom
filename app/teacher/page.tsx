import { auth } from '@/auth';
import Header from '@/components/ui/Header';
import ProfileCard from '@/components/ui/ProfileCard';

export default async function Page() {
	const session = await auth();
	const name = session?.user.user.name;
	return (
		<div className='w-full h-full'>
			<Header title={'Ваш профиль'} exit={true} />
			<div className='h-[calc(100%-60px)] flex items-center gap-[80px] py-[44px] justify-between '>
				<div className='qamx h-full flex flex-col justify-between'>
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
					</div>
				</div>
				<ProfileCard text='Личные данные' img='user' link='#' />
				<ProfileCard
					text='Ваши курсы'
					img='courses'
					link='/teacher/courses'
				/>
			</div>
		</div>
	);
}
