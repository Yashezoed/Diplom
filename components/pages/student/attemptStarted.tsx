'use client';
import StudentLayout from '@/components/layuout/studentLayout';
import { Suspense } from 'react';
import Test from './test';
import isError from '@/lib/api/isError';
import { ILessonDescription } from '@/interfaces/lessonDescription';
import { ITest } from '@/interfaces/test';
import { IattemptStarted } from '@/interfaces/checkingAttempt';
import { IListQuestions } from '@/interfaces/listQuestions';

export default function AttemptStarted({
	testInfo,
	currentTest,
	attempt,
	questions
}: {
	testInfo: ILessonDescription;
	currentTest: ITest;
	attempt: IattemptStarted;
	questions: IListQuestions[];
}) {
	return (
		<StudentLayout
			title={`${testInfo.discipline.name} | ${currentTest.name}`}
		>
			<Suspense fallback={<div>Загрузка...</div>}>
				{!isError(testInfo) ? (
					<Test
						attemptId={attempt.idResult}
						data={questions}
						minutes={attempt.minutes}
						seconds={attempt.second}
						attempt={attempt}
					/>
				) : (
					<></>
				)}
			</Suspense>
		</StudentLayout>
	);
}
