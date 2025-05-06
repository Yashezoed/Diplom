'use server'
import { signOut } from '@/auth';
import { ChevronRight } from 'lucide-react';
import { Button } from './button';

export const signOutFn = async () => await signOut();

export const ExitButton = async () => {
	return (
		<>
			<form
				action={signOutFn}
			>
				<Button variant={'linkBtn'} size={'linkBtn'} type='submit' className='flex justify-between'>
					<span>Выйти</span>
					<ChevronRight size={36} strokeWidth={1.25} color='#000000' />
				</Button>
			</form>
		</>
	);
};
