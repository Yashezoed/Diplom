'use server'
import { ChevronLeft, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ExitButton } from '@/components/ui/exit';
import fetchTests from '@/lib/api/fetchTests';
import { Suspense } from 'react';
import isError from '@/lib/api/isError';
import MainTests from '@/components/ui/mainTests';

// export async function selectLesson(data: ITest[], lessonId: number) {
// 	console.log(lessonId);
	
// 	console.log(data[lessonId]);
// 	data[lessonId].isSelected = true;
// 	console.log(data[lessonId])

	
// }

export default async function tests(
	props: { id: number; title: string }
) {
	const data = await fetchTests(props.id);
	// console.log(data)
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
					<MainTests data={data}/>
					

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
