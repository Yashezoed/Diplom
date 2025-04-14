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
					<p className="text-[36px] ">Выйти</p>
					<ChevronRight size={48} strokeWidth={1.5} color='#000000' />
				</Button>
			</form>
		</>
	);
};
