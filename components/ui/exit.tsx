import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';

export const ExitButton = () => {
	return (
		<form
			action={async () => {
				'use server';
				return await signOut();
			}}
		>
			<button type='submit'>
				<LogOut className='w-8 h-8 text-white cursor-pointer' />
			</button>
		</form>
	);
};
