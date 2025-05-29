import Header from '@/components/ui/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import fetchTests from '@/lib/api/teacher/tests';
import isError from '@/lib/api/isError';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PencilLine } from 'lucide-react';

export default async function TestsPage({
	params
}: {
	params: Promise<{
		courseId: number;
		groupId: number;
	}>;
}) {
	const { courseId, groupId } = await params;
	const data = await fetchTests(courseId);
	return (
		<>
			<Header title='Тесты' />
			{isError(data) && <>Перезагрузите страницу</>}
			{!isError(data) && (
				<div className='h-[calc(100%-30px)] flex flex-col justify-between'>
					<ScrollArea className='py-10 rounded-3xl '>
						<div className='grid grid-cols-3 gap-[64px]'>
							{!isError(data) &&
								data.map((card) => (
									<Button
										variant='outline'
										size={'lg'}
										className='text-[30px] text-center text-wrap w-full '
										key={card.id}
									>
										<Link
											href={{
												pathname: `/teacher/courses/${courseId}/groups/${groupId}/tests/${card.id}`
											}}
										>
											{card.name}
										</Link>
										<Link
											href={'#'}
											className='p-[5px] hover:text-[#ff0000] '
										>
											<PencilLine size={'30px'} strokeWidth={1.5} />
										</Link>
									</Button>
								))}
							{isError(data) && <>Перезагрузите страницу</>}
						</div>
					</ScrollArea>
					<Link href={'#'} className='flex justify-end pb-[30px]'>
						<Button size={'lg'} className='text-[40px]'>
							Создать Тест
						</Button>
					</Link>
				</div>
			)}
		</>
	);
}
