import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function page() {
	return (
		<>
			<Link href={'/student/profile'}>
				<Button variant={'outline'} size={'profileBtn'}>
					Личные данные
				</Button>
			</Link>

			<Button variant={'nonActive'} size={'profileBtn'}>
				Статистика
			</Button>

			<Link href={'/student'}>
				<Button variant={'outline'} size={'profileBtn'}>
					Дисциплины
					<ChevronRight size={48} strokeWidth={1.5} color='#000000' />
				</Button>
			</Link>
		</>
	);
}
