'use server'

import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchListQuestions from '@/lib/api/fetchListQuestions';
import fetchTests from '@/lib/api/fetchTests';
import { checkingAttempt } from '@/lib/api/test';
import TestController from '@/components/pages/student/testController';
import isError from '@/lib/api/isError';

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

	console.log(attempt);
	if (!isError(dataTests) && !isError(testInfo) && !isError(questions) && !isError(attempt) && currentTest) {
		return (
			<TestController
				testInfo={testInfo}
				currentTest={currentTest}
				questions={questions}
				attempt={attempt}
				id={id}
			/>
		)
	}
	return (
		<>Ошибка</>
	)


	// if (isIcompletedAttempt(attempt)) {
	// 	// Попытка была завершена
	// 	console.log('попытка была завершена attempt', attempt);

	// 	return (
	// 		<>
	// 			<Modal
	// 				titleText='Хотите посмотреть результаты прошлой попытки?'
	// 				actionText='Да'
	// 				cancelText='Нет'
	// 				attempt={attempt}
	// 				action='redirectToResult'
	// 				cancel='newAttempt'
	// 			/>
	// 			{/* <NoAttemptStarted
	// 				currentTest={currentTest}
	// 				id={id}
	// 				questions={questions}
	// 				testInfo={testInfo}
	// 			/> */}
	// 		</>
	// 	);
	// } else if (isIattemptStarted(attempt)) {
	// 	// Попытка уже была начата и еще не завершена

	// 	return (
	// 		<>
	// 			<Modal
	// 				titleText='Хотите посмотреть результаты прошлой попытки?'
	// 				actionText='Да'
	// 				cancelText='Нет'
	// 				attempt={attempt}
	// 				action='redirectToResult'
	// 				cancel='newAttempt'
	// 			/>
	// 			{/* <AttemptStarted
	// 				attempt={attempt}
	// 				currentTest={currentTest}
	// 				questions={questions}
	// 				testInfo={testInfo}
	// 			/> */}
	// 		</>
	// 	);
	// } else if (isInoAttemptStarted(attempt)) {
	// 	// Попытка еще не было начата
	// 	console.log('noAttemptStarted');
	// 	return (
	// 		<NoAttemptStarted
	// 			currentTest={currentTest}
	// 			id={id}
	// 			questions={questions}
	// 			testInfo={testInfo}
	// 		/>
	// 	);
	// } else {
	// 	console.log('Ошибка', attempt);
	// }
}
