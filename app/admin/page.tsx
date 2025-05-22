import Header from '@/components/ui/Header';
import ProfileCard from '@/components/ui/ProfileCard';

export default async function Page() {
	return (
		<div className='w-full h-full'>
			<Header title={'Ваш профиль'} exit={true} />
			<div className='h-[calc(100%-60px)] flex items-center  justify-evenly '>
				<ProfileCard text='Пользователи' img='user' link='#' />
				<ProfileCard text='Тесты' img='test' link='#' />
			</div>
		</div>
	);
}
