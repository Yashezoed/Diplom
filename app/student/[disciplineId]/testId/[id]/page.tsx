import StudentLayout from '@/components/layuout/studentLayout';
import Test from '@/components/pages/student/question';
import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchListQuestions from '@/lib/api/fetchListQuestions';
import fetchTests from '@/lib/api/fetchTests';
import isError from '@/lib/api/isError';
import { Suspense } from 'react';

export default async function page({
	params
}: {
	params: {
		disciplineId: number;
		id: number;
	};
}) {
	const { disciplineId, id } = await params;
	const dataTests = await fetchTests(disciplineId); //список тестов
	const testInfo = await fetchLesson(id); //информация о тесте
	const currentTest = (dataTests as ITest[]).find((test) => test.id == id);
	const questions = await fetchListQuestions(id); // список вопросов
	// console.log(dataTests);
	// console.log(currentTest);
	// console.log(questions[2].answers);
	return (
		<StudentLayout
			title={
				!isError(testInfo) && currentTest
					? `${testInfo.discipline.name} | ${currentTest.name}`
					: 'Заголовок теста'
			}
		>
			<Suspense fallback={<div>Загрузка...</div>}>
				{isError(questions) ? (
					<div>
						Status {questions.status} error messgae{' '}
						{questions.message}
					</div>
				) : (
					<Test data={questions} />
				)}
			</Suspense>
		</StudentLayout>
	);
}
