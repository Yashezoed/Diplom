import AdminHeader from '@/components/ui/adminHeader';
import AdmProfileCard from '@/components/ui/admProfileCard';

export default async function Page() {
	return (
		<div className='w-full h-full'>
			<AdminHeader title={'Ваш профиль'} />
			<div className='h-[calc(100%-60px)] flex items-center  justify-evenly '>
				<AdmProfileCard
					text='Пользователи'
					img='user'
				/>
				<AdmProfileCard
					text='Тесты'
					img='test'
				/>
			</div>
		</div>
	);
}
