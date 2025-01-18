import { ChevronLeft, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ExitButton } from '@/components/ui/exit';
import { ScrollArea } from '@/components/ui/scroll-area';
import fetchTests from '@/lib/api/fetchTests';
import { Suspense } from 'react';
import isError from '@/lib/api/isError';
import LessonDescription from '../ui/lessonDescription';
import Lessons from '../ui/lessons';



export default async function tests(props: { id: number; title: string }) {
	const data = await fetchTests(props.id);
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			{isError(data) ? (
				<div>
					Status {data.status} error messgae {data.message}
				</div>
			) : (
				<>
					<header className='flex justify-between items-center h-[75px]  mt-10'>
						<div className='flex items-center'>
							<Link href={'/student'}>
								<ChevronLeft
									color='white'
									height={60}
									width={60}
								/>
							</Link>
							<h1 className='text-4xl font-bold text-white ml-5'>
								{props.title}
							</h1>
						</div>

						<div className='flex gap-4'>
							<Link href={'/student/profile'}>
								<UserCircle2 className='w-8 h-8 text-white cursor-pointer' />
							</Link>
							<ExitButton />
						</div>
					</header>
					<div className='flex justify-between'>
						<ScrollArea
							className='h-[90vh] w-[460px] mt-10 ' /* onClick={} */
						>
							<Lessons data={data} />
						</ScrollArea>
						<LessonDescription id={1} />
					</div>

					{/* Нужно:
			1. название дисциплины брать из дисциплины, на которую нажал студент !DONE!
			2. Зафетчить все уроки у дисциплины и отобразить через LessonBlock !DONE!
			3. При нажатии на урок должна всплывать описание урока справа
			4. в правом блоке реализовать ссылку на сам тест */}
				</>
			)}
		</Suspense>
	);
}
