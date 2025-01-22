import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLessonDescription';
import fetchTests from '@/lib/api/fetchTests';
import { Suspense } from 'react';
import isError from '@/lib/api/isError';
import { ScrollArea } from '@/components/ui/scroll-area';
import TestDescription from '@/components/ui/TestDescription';
import Tests from '@/components/pages/student/Tests';
import StudentLayout from '@/components/layuout/studentLayout';

export default async function Page({
	params,
	searchParams
}: {
	params: Promise<{
		disciplineId: number;
	}>;
	searchParams: {
		testId?: number;
	};
}) {
	const { testId } = await searchParams; // id в url
	const disciplineId = (await params).disciplineId;
	const dataTests = await fetchTests(disciplineId); //список тестов
	// TODO обработка ошибки

	const testInfo = await fetchLesson(testId || (dataTests as ITest[])[0].id); //информация о тесте
	return (
		<>
			{!isError(testInfo) && <StudentLayout title={testInfo.discipline.name}>
				<Suspense fallback={<div>Загрузка...</div>}>
					{isError(dataTests) ? (
						<div>
							Status {dataTests.status} error messgae{' '}
							{dataTests.message}
						</div>
					) : (
						<>
							<div className='flex justify-between'>
								<ScrollArea className='h-[90vh] w-[460px] mt-10 '>
									<Tests data={dataTests} />
								</ScrollArea>
								{isError(testInfo) ? (
									<div>
										Status {testInfo.status} error messgae{' '}
										{testInfo.message}
									</div>
								) : (
									<TestDescription data={testInfo} />
								)}
							</div>
						</>
					)}
				</Suspense>
			</StudentLayout>}
		</>
	);
}
