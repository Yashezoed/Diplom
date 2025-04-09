'use server'
import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';

// TODO не забыть удалить
export const signOutFn = async () => await signOut();

export const ExitButton = async () => {
	return (
		<>
			<form
				action={signOutFn}
			>
				<button type='submit'>
					<LogOut className='w-8 h-8 text-black cursor-pointer' />
				</button>
			</form>
		</>
	);
};
