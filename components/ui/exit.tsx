
import { signOut } from '@/auth.config';
import { LogOut } from 'lucide-react';
import { auth } from '@/auth.config';

export const ExitButton = () => {
	
	return (
		<form
			action={async () => {
				'use server';
				const session = await auth();
				console.log('=================>',session)
				// deleteSession()
				return await signOut();
			}}
		>
			<button type='submit'>
				<LogOut className='w-8 h-8 text-white cursor-pointer' />
			</button>
		</form>
	);
};
