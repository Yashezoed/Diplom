import AttemptStarted from '@/components/pages/student/attemptStarted';
import NoAttemptStarted from '@/components/pages/student/noAttemptStarted';
import MyAlertDialogClient from '@/components/ui/client-alert-dialog';
import {
	isIattemptStarted,
	isIcompletedAttempt,
	isInoAttemptStarted
} from '@/interfaces/checkingAttempt';
import { ITest } from '@/interfaces/test';
import fetchLesson from '@/lib/api/fetchLesson';
import fetchListQuestions from '@/lib/api/fetchListQuestions';
import fetchTests from '@/lib/api/fetchTests';
import { checkingAttempt } from '@/lib/api/test';

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
		// Попытка была завершена
		console.log('попытка была завершена attempt', attempt);
		return (
			<MyAlertDialogClient
				titleText='Хотите посмотреть результаты прошлой попытки?'
				actionText='Да'
				cancelText='Нет'
				attempt={attempt}
				action='redirectToresult'
				cancel='reload'
			/>
		);
	} else if (isIattemptStarted(attempt)) {
		// Попытка уже была начата и еще не завершена
		//TODO добавить модальное окно что попытка уже завершена и пользователь может начать новую попытку или посмотреть результаты пройденной попытки
		console.log('Данные ответов на сервере =>', attempt.userResponesTest);
		return (
			<AttemptStarted
				attempt={attempt}
				currentTest={currentTest}
				questions={questions}
				testInfo={testInfo}
			/>
		);
	} else if (isInoAttemptStarted(attempt)) {
		// Попытка еще не было начата
		console.log('noAttemptStarted');
		return (
			<NoAttemptStarted
				currentTest={currentTest}
				id={id}
				questions={questions}
				testInfo={testInfo}
			/>
		);
	} else {
		console.log('Ошибка', attempt);
	}
}
