import { ChevronRight } from 'lucide-react';
import { Button } from './button';

export default function ProfileButton() {
	return (
		<Button variant={'linkBtn'} size={'linkBtn'}>
			Профиль
			<ChevronRight size={36} strokeWidth={1.25} color='#000000' />
		</Button>
	);
}
