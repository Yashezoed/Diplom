import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
	return (
		<div className='flex gap-[35px]'>
			<Button variant={'nonActive'} size={'profileBtn'}>
				Личные данные
			</Button>
			<Link href={'/student/profile/statistic'}>
				<Button variant={'outline'} size={'profileBtn'}>
					Статистика
				</Button>
			</Link>

			<Link href={'/student'}>
				<Button variant={'outline'} size={'profileBtn'}>
					Дисциплины
					<ChevronRight size={48} strokeWidth={1.5} color='#000000' />
				</Button>
			</Link>
		</div>
	);
}
