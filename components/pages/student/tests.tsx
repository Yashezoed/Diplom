import { ChevronLeft, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ExitButton } from '@/components/ui/exit';
import { ScrollArea } from '@/components/ui/scroll-area';
import LessonBlock from '@/components/ui/lesson-block';

export default async function Tests() {
	return (
		<>
			<header className='flex justify-between items-center h-[75px]  mt-10'>
				<div className='flex items-center'>
					<Link href={'/student'}>
						<ChevronLeft color='white' height={60} width={60} />
					</Link>
					<h1 className='text-4xl font-bold text-white ml-5'>
						Название дисциплины
					</h1>
				</div>

				<div className='flex gap-4'>
					<Link href={'/student/profile'}>
						<UserCircle2 className='w-8 h-8 text-white cursor-pointer' />
					</Link>
					<ExitButton />
				</div>
			</header>
			<ScrollArea className='h-[200px] w-[460px] mt-10'>
				<LessonBlock text={'Урок 1. Грамматика'} />
			</ScrollArea>
			{/* Нужно:
			1. название дисциплины брать из дисциплины, на которую нажал студент
			2. Зафетчить все уроки у дисциплины и отобразить через LessonBlock
			3. При нажатии на урок должна всплывать описание урока справа
			4. в правом блоке реализовать ссылку на сам тест */}
		</>
	);
}
