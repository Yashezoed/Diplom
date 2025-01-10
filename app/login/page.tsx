import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='absolute bg-cover bg-no-repeat bg-[top_left_400px] bg-left-top bg-[url("/jet.jpg")] bg-[linear-gradient(120deg,rgba(0,138,209,1)_0%,rgba(0,138,209,0.7)_100%)] -right-[100px] w-screen h-screen -right-[450px] z-0'></div>
			{/* Фото фона */}
			<div className='grid min-h-screen grid-cols-1 lg:grid-cols-[600px_1fr] '>
				<div className='fixed z-20 -rotate-[22deg] bg-[#0060a1] -translate-y-[100px] -translate-x-[600px]' style={{width: '2000px', height: '5000px'}}></div>{' '}
				{/* Синий блок */}
				<div className='absolute inset-0 bg-[linear-gradient(120deg,rgba(0,138,209,1)_0%,rgba(0,138,209,0.7)_100%)] z-1'></div>{' '}
				{/* Градиент */}
				<div className='flex flex-col justify-center px-16 z-30'>
					<div className='w-full space-y-8'>
						<h1 className='text-5xl font-bold text-white'>
							Авторизация
						</h1>
						<form className='space-y-6'>
							<Input
								id='username'
								placeholder='Имя пользователя'
								className='h-14 border-none bg-[#008AD1] px-6 !text-[20px] text-white placeholder:text-white rounded-xl focus-visible:ring-white font-semibold'
								required
							/>
							<Input
								id='password'
								type='password'
								placeholder='Пароль'
								className='h-14 border-none bg-[#008AD1] px-6 !text-[20px] text-white placeholder:text-white rounded-xl focus-visible:ring-white font-semibold'
								required
							/>
							<Button className='h-14 w-full rounded-xl border-2 border-white bg-transparent text-2xl font-medium text-white hover:bg-white hover:text-[#006BB6] font-semibold'>
								Войти
							</Button>
						</form>
					</div>
				</div>
				<div className='hidden lg:block relative absolute t-0	z-10'></div>
			</div>
		</div>
	);
}
