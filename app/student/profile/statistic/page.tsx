import Statistics from '@/components/pages/student/statistics';
import { Button } from '@/components/ui/button';
import { IAVGScore } from '@/interfaces/AVGScore';
import { ICourse } from '@/interfaces/course';
import { ITestResults } from '@/interfaces/testResults';
import fetchDisciplines from '@/lib/api/fetchDisciplines';
import { AVGScore, testResults } from '@/lib/api/studentProfile';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function page({
	searchParams
}: {
	searchParams: { disciplineId?: number };
}) {
	const disciplineId = searchParams.disciplineId;
	const disciplines = (await fetchDisciplines()) as ICourse[];
	const avgScrore = (await AVGScore(disciplineId || 1)) as IAVGScore;
	const results = await testResults(disciplineId || 1) as ITestResults[];
	return (
		<div>
			<div className='flex  gap-[35px]'>
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
						<ChevronRight
							size={48}
							strokeWidth={1.5}
							color='#000000'
						/>
					</Button>
				</Link>
			</div>
			<Statistics data={disciplines} AVGScore={avgScrore} results={results} />
		</div>
	);
}
