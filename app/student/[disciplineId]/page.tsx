import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchTests from '@/lib/api/fetchTests';
import isError from '@/lib/api/isError';
import { ScrollArea } from '@/components/ui/scroll-area';
import TestDescription from '@/components/ui/TestDescription';
import StudentLayout from '@/components/layout/studentLayout'; // исправлено
import Tests from '@/components/pages/student/tests';

export default async function Page({
	params,
	searchParams
}: {
	params: {
		disciplineId: string; // обычно строка
	};
	searchParams: {
		testId?: string;
	};
}) {
	const disciplineId = Number(params.disciplineId);
	const testId = searchParams.testId
		? Number(searchParams.testId)
		: undefined;

	const dataTests = await fetchTests(disciplineId);
	const testInfo = await fetchLesson(testId || (dataTests as ITest[])[0].id);

	return (
		<>
			{!isError(testInfo) ? (
				<StudentLayout title={testInfo.discipline.name}>
					{isError(dataTests) ? (
						<div>
							Status {dataTests.status} error message{' '}
							{dataTests.message}
						</div>
					) : (
						<div className='flex justify-around h-full pb-[30px] pt-6'>
							<ScrollArea>
								<div className='flex flex-col gap-[22px]'>
									<Tests data={dataTests} />
								</div>
							</ScrollArea>
							<TestDescription data={testInfo} />
						</div>
					)}
				</StudentLayout>
			) : (
				<div>
					Status {testInfo.status} error message {testInfo.message}
				</div>
			)}
		</>
	);
}
