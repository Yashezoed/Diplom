'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authenticate } from '@/lib/api/auth';
import React from 'react'
import { useActionState } from 'react';

export default function Login() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);
  return (
	<form
			action={formAction}
			className='min-h-screen relative overflow-hidden'
		>
			<div className='absolute bg-cover bg-no-repeat bg-[top_left_400px] bg-left-top bg-[url("/jet.png")] bg-[linear-gradient(120deg,rgba(0,138,209,1)_0%,rgba(0,138,209,0.7)_100%)] -right-[100px] w-screen h-screen -right-[450px] z-0'></div>
			{/* Фото фона */}
			<div className='grid min-h-screen grid-cols-1 lg:grid-cols-[600px_1fr] '>
				<div
					className='fixed z-20 -rotate-[22deg] bg-[#0060a1] -translate-y-[100px] -translate-x-[600px]'
					style={{ width: '2000px', height: '5000px' }}
				></div>
				{/* Синий блок */}
				<div className='absolute inset-0 bg-[linear-gradient(120deg,rgba(0,138,209,1)_0%,rgba(0,138,209,0.7)_100%)] z-1'></div>
				{/* Градиент */}
				<div className='flex flex-col justify-center px-16 z-30'>
					<div className='w-full space-y-8'>
						<h1 className='text-5xl font-bold text-white'>
							Авторизация
						</h1>
						<div className='space-y-6'>
							<Input
								id='username'
								placeholder='Имя пользователя'
								name='login'
								className='h-14 border-none bg-[#008AD1] px-6 !text-[20px] text-white placeholder:text-white rounded-xl focus-visible:ring-white font-semibold'
								required
							/>
							<Input
								id='password'
								type='password'
								name='password'
								placeholder='Пароль'
								className='h-14 border-none bg-[#008AD1] px-6 !text-[20px] text-white placeholder:text-white rounded-xl focus-visible:ring-white font-semibold'
								required
							/>
							<Button
								className='h-14 w-full rounded-xl border-2 border-white bg-transparent text-2xl font-medium text-white hover:bg-white hover:text-[#006BB6] font-semibold'
								aria-disabled={isPending}
							>
								Войти
							</Button>
							<div
								className='flex h-8 items-end space-x-1'
								aria-live='polite'
								aria-atomic='true'
							>
								{errorMessage && (
									<p className='text-white text-3xl font-semibold'>
										{errorMessage}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className='hidden lg:block relative absolute t-0 z-10'></div>
			</div>
		</form>
  )
}
