import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchTests from '@/lib/api/fetchTests';
import { Suspense } from 'react';
import isError from '@/lib/api/isError';
import { ScrollArea } from '@/components/ui/scroll-area';
import TestDescription from '@/components/ui/TestDescription';
import StudentLayout from '@/components/layuout/studentLayout';
import Tests from '@/components/pages/student/tests';

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
	const { testId } = await searchParams; // id выбранного теста в url
	const disciplineId = (await params).disciplineId; // id дисциплины
	const dataTests = await fetchTests(disciplineId); //список тестов
	const testInfo = await fetchLesson(testId || (dataTests as ITest[])[0].id); //информация о тесте'


	return (
		<>
			{!isError(testInfo) ? (
				<StudentLayout title={testInfo.discipline.name}>
					<Suspense fallback={<div>Загрузка...</div>}>
						{isError(dataTests) ? (
							<div>
								Status {dataTests.status} error message{' '}
								{dataTests.message}
							</div>
						) : (
							<>
								<div className='flex justify-around  h-full pb-[30px] pt-6 '>
									<ScrollArea>
										<div className='flex flex-col gap-[22px]'>
											<Tests data={dataTests} />
										</div>
									</ScrollArea>
									<TestDescription data={testInfo} />
								</div>
							</>
						)}
					</Suspense>
				</StudentLayout>
			) : (
				<div>
					Status {testInfo.status} error message {testInfo.message}
				</div>
			)}
		</>
	);
}
