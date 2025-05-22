import { Button } from '@/components/ui/button';
import Header from '@/components/ui/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import isError from '@/lib/api/isError';
import fetchResults from '@/lib/api/teacher/results';
import { User, X } from 'lucide-react';
import Link from 'next/link';

export default async function TestPage({
	params
}: {
	params: {
		courseId: number;
		groupId: number;
		testId: number;
	};
}) {
	const { groupId, testId } = await params;
	const data = await fetchResults(groupId, testId);

	return (
		<>
			<Header title='Итоги тестирования' />
			<div className='h-[calc(100%-30px)] flex justify-between pt-[70px]'>
				<ScrollArea className='w-[50%]'>
					{!isError(data) &&
						data.map((student) => (
							<div
								className='flex items-center gap-[10px] pb-[20px]'
								key={student.user.id}
							>
								<User size={60} />
								<div className='w-full flex justify-between text-wrap text-[24px] font-medium bg-[#D9D9D9] rounded-[15px] py-[15px] px-[25px]'>
									<p>{student.user.fullName}</p>
									{student.result === null ? (
										<X size={40} strokeWidth={1.5} />
									) : (
										<p>{student.result}%</p>
									)}
								</div>
							</div>
						))}
				</ScrollArea>
				<div className='flex items-end pb-[40px]'>
					<div className='flex flex-col gap-[20px]'>
						<Link href={'#'}>
							<Button variant={'default'} className='p-[20px] w-full'>
								Статистика
							</Button>
						</Link>
						<Link href={'#'}>
							<Button variant={'default'} className='p-[20px]  w-full'>
								Завершить просмотр
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
