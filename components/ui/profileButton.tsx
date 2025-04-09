import { ChevronRight } from 'lucide-react';
import { Button } from './button';

export default function ProfileButton() {
	return (
		<Button variant={'linkBtn'} size={'linkBtn'}>
			Профиль
			<ChevronRight size={48} strokeWidth={1.5} color='#000000' />
		</Button>
	);
}
