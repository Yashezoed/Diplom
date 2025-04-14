'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authenticate } from '@/lib/api/auth';
import FixAuth from '@/lib/api/fixAuth';
import Image from 'next/image';
import React from 'react';
import { useActionState } from 'react';

export default function Login() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	return (
		<form
			action={formAction}
			className='min-h-screen relative overflow-hidden bg-background'
		>
			<FixAuth />
			<div className='bg-white rounded-[65px] my-[30px] mx-[93px] flex'>
				<Image
					src={'/plane.jpg'}
					alt='Самолет'
					width={740}
					height={740}
					className='rounded-[52px] m-[77px]'
				/>
				<div className='flex flex-col mt-[114px] mr-[181px] w-full'>
					<h1 className='text-[64px] font-bold text-black'>
						Авторизация
					</h1>
					<div className='flex flex-col gap-[48px] mt-[30px]'>
						<Input
							id='username'
							about='Имя пользователя'
							placeholder='Введите имя'
							name='login'
							className='h-[78px] border-2 bg-white px-6 !text-[32px] text-black placeholder:text-black/30 rounded-xl focus-visible:ring-white font-semibold'
							required
						/>
						<Input
							id='password'
							type='password'
							about='Пароль'
							name='password'
							placeholder='Введите пароль'
							className='h-[78px] border-2 bg-white px-6 !text-[32px] text-black placeholder:text-black/30 rounded-xl focus-visible:ring-white font-semibold'
							required
						/>
						<Button aria-disabled={isPending} className='mt-[20px]'>
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
		</form>
	);
}
