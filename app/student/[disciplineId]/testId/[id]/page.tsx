import StudentLayout from '@/components/layuout/studentLayout';
import Test from '@/components/pages/student/test';
import {
	isIattemptStarted,
	isIcompletedAttempt,
	isInoAttemptStarted
} from '@/interfaces/checkingAttempt';
import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchListQuestions from '@/lib/api/fetchListQuestions';
import fetchTests from '@/lib/api/fetchTests';
import isError from '@/lib/api/isError';
import { checkingAttempt, createAttempt } from '@/lib/api/test';
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

	const attempt = await checkingAttempt(id);

	if (isIcompletedAttempt(attempt)) {
		console.log("попытка была завершена attempt", attempt);

		// Попытка была завершена
		// console.log('Попытка завершена');
		//TODO добавить модальное окно что попытка уже завершена и пользователь может начать новую попытку или посмотреть результаты пройденной попытки
	} else if (isIattemptStarted(attempt)) {
		// Попытка уже была начата и еще не завершена
		//TODO добавить модальное окно что попытка уже завершена и пользователь может начать новую попытку или посмотреть результаты пройденной попытки
		console.log('Данные ответов на сервере =>', attempt.userResponesTest);

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
					) : !isError(testInfo) ? (
						<Test
							attemptId={attempt.idResult}
							data={questions}
							minutes={attempt.minutes}
							seconds={attempt.second}
							attempt={attempt}
						/>
					) : (
						<Test
							attemptId={attempt.idResult}
							data={questions}
							attempt={attempt}
						/>
					)}
				</Suspense>
			</StudentLayout>
		);
	} else if (isInoAttemptStarted(attempt)) {
		// Попытка еще не было начата
		const newAttemptId = await createAttempt(id);

		return !isError(questions) &&
			!isError(testInfo) &&
			currentTest &&
			!isError(newAttemptId) ? (
			<StudentLayout
				title={`${testInfo.discipline.name} | ${currentTest.name}`}
			>
				<Suspense fallback={<div>Загрузка...</div>}>
					<Test
						attemptId={newAttemptId.id}
						data={questions}
						minutes={testInfo.time}
					/>
				</Suspense>
			</StudentLayout>
		) : (
			<>Ошибка</>
		);
	} else {
		console.log('Ошибка', attempt);
	}
}
