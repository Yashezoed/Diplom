'use server';

import StudentLayout from '@/components/layuout/studentLayout';
import AttemptStarted from '@/components/pages/student/attemptStarted';
import NoAttemptStarted from '@/components/pages/student/noAttemptStarted';
import {
	isIattemptStarted,
	isInoAttemptStarted
} from '@/interfaces/checkingAttempt';
import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchListQuestions from '@/lib/api/fetchListQuestions';
import fetchTests from '@/lib/api/fetchTests';
import isError from '@/lib/api/isError';
import { checkingAttempt } from '@/lib/api/test';
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
	const testInfo = await fetchLesson(id); //информация о тесте
	const dataTests = await fetchTests(disciplineId); //список тестов
	const questions = await fetchListQuestions(id); // список вопросов
	const currentTest = (dataTests as ITest[]).find((test) => test.id == id);
	const attempt = await checkingAttempt(id);
	console.log(attempt);

	// console.log(dataTests);
	// console.log(id);
	// console.log(currentTest);

	if (!isError(testInfo) && !isError(questions) && currentTest) {
		return (
			<StudentLayout
				title={`${testInfo.discipline.name} | ${currentTest.name}`}
				profileBtn={true}
			>
				<Suspense fallback={<div>Загрузка...</div>}>
					{isInoAttemptStarted(attempt) && (
						<NoAttemptStarted
							id={id}
							questions={questions}
							testInfo={testInfo}
						/>
					)}
					{isIattemptStarted(attempt) && (
						<AttemptStarted
							attempt={attempt}
							questions={questions}
						/>
					)}
				</Suspense>
			</StudentLayout>
		);
	}
}
