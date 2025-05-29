import Header from '@/components/ui/Header';
import Statistics from '@/components/ui/statistics';
import StatisticsSkeleton from '@/components/ui/statisticsSkeleton';
import { IAVGScore } from '@/interfaces/AVGScore';
import { ICourse } from '@/interfaces/course';
import isError from '@/lib/api/isError';
import { AVGScore } from '@/lib/api/teacher/avgScore';
import fetchStudentDisciplines from '@/lib/api/teacher/disciplines';
import fetchStudentInfo from '@/lib/api/teacher/studentInfo';
import { StudentResults } from '@/lib/api/teacher/studentResult';
import { Suspense } from 'react';

async function TestResultsWrapper({
	disciplineId,
	studentId
}: {
	disciplineId: number;
	studentId: number;
}) {
	const disciplines = (await fetchStudentDisciplines(studentId)) as ICourse[];
	const avgScrore = (await AVGScore(
		studentId,
		disciplineId || 1
	)) as IAVGScore;
	const results = await StudentResults(studentId, disciplineId || 1);

	return (
		<Statistics data={disciplines} AVGScore={avgScrore} results={results} />
	);
}

export default async function StatStudentPage({
	params,
	searchParams
}: {
	params: {
		courseId: number;
		groupId: number;
		studentId: number;
	};
	searchParams: {
		studentName: string;
		disciplineId: number;
	};
}) {
	const { /* courseId, groupId, */ studentId } = await params;
	const { studentName, disciplineId } = await searchParams;

	const studentInfo = await fetchStudentInfo(studentId);

	return (
		<>
			<Header title={studentName} />
			<div className='h-[calc(100%-50px)] flex pt-[30px] justify-around'>
				{!isError(studentInfo) && (
					<div className='flex flex-col justify-between'>
						<div className='w-[400px] h-[400px] rounded-full bg-primary flex justify-center items-center'>
							<p className='text-[200px] text-white font-semibold'>
								{studentInfo.fullName
									.split(' ').slice(0,2)
									.map((word) => word[0].toLocaleUpperCase())}
							</p>
						</div>
						<div className='mt-[50px]'>
							<p className=' text-[40px] font-bold '>
								{studentInfo.fullName}
							</p>
							<p className='text-[28px] font-semibold'>
								{studentInfo.group.name}
							</p>
						</div>
					</div>
				)}
				<div className='w-[1069px]'>
					<Suspense
						fallback={<StatisticsSkeleton />}
						key={disciplineId?.toString()}
					>
						<TestResultsWrapper
							disciplineId={disciplineId as number}
							studentId={studentId}
						/>
					</Suspense>
				</div>
			</div>
		</>
	);
}
