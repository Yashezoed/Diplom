'use server';
import fetchLesson from '@/lib/api/fetchLesson';
import { checkingAttempt } from '@/lib/api/test';
import isError from '@/lib/api/isError';
import {
	IcompletedAttempt,
	isIattemptStarted,
	isIcompletedAttempt,
	isInoAttemptStarted
} from '@/interfaces/checkingAttempt';
import Dialog from '@/components/ui/dialog';

export default async function page({
	params
}: {
	params: Promise<{
		disciplineId: string;
		id: number
	}>;
}) {
	const { disciplineId, id } = await params;

	const testInfo = await fetchLesson(id); //информация о тесте
	const attempt = await checkingAttempt(id);

	switch (true) {
		case isInoAttemptStarted(attempt):
			if (!isError(testInfo)) {
				return (
					<Dialog
						title={
							<>
								{testInfo.name}.<br />
								{testInfo.time && `Время на прохождение теста ${testInfo.time}
								мин.`}
							</>
						}
						actionText='Начать тест'
						ActionHref={`/student/${disciplineId}/testId/${id}/test`}
					/>
				);
			}
		case isIcompletedAttempt(attempt):
			const attemptCompleted = attempt as IcompletedAttempt;
			// ?? Возможно не самое лучшее решение с actionHref

			return (
				<Dialog
					title={'У вас есть завершенная попытка'}
					actionText='Посмотреть результат'
					cancelText='Начать новую попытку'
					cancelHref={`/student/${disciplineId}/testId/${id}/test`}
					ActionHref={`/student/resultTest?id=${
						attemptCompleted.idUserRespones
					}&testName=${
						attemptCompleted.nameTest
					}&result=${attemptCompleted.result.toFixed(
						0
					)}&evaluationName=${
						attemptCompleted.evaluationName
					}&attempts=${attemptCompleted.attempts}`}
					IdResult={attemptCompleted.idUserRespones}
				/>
			);
		case isIattemptStarted(attempt):
			return (
				<Dialog
					title={'У вас есть активная попытка'}
					actionText='Продолжить тестирование'
					ActionHref={`/student/${disciplineId}/testId/${id}/test`}
				/>
			);
	}
}
