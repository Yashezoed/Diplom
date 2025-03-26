import {
	IattemptStarted,
	IcompletedAttempt,
	InoAttemptStarted,
	isIattemptStarted,
	isIcompletedAttempt,
	isInoAttemptStarted
} from '@/interfaces/checkingAttempt';
import { ILessonDescription } from '@/interfaces/lessonDescription';
import { IListQuestions } from '@/interfaces/listQuestions';
import { ITest } from '@/interfaces/test';
import NoAttemptStarted from './noAttemptStarted';
import Modal from '@/components/ui/modal';
import AttemptStarted from './attemptStarted';

export default function TestController({
	testInfo,
	currentTest,
	questions,
	attempt,
	id
}: {
	testInfo: ILessonDescription;
	currentTest: ITest;
	questions: IListQuestions[];
	attempt: IattemptStarted | InoAttemptStarted | IcompletedAttempt;
	id: number;
}) {
	switch (true) {
		case isIcompletedAttempt(attempt):
			console.log('IcompletedAttempt', attempt);

			return <Modal
					titleText='Хотите посмотреть результаты прошлой попытки?'
					actionText='Да'
					cancelText='Нет'
					attempt={attempt}
					action='redirectToResult'
					cancel='newAttempt'
				/>;

		case isIattemptStarted(attempt):
			console.log('IattemptStarted', attempt);
			return (
				<>
					<AttemptStarted
					attempt={attempt}
					currentTest={currentTest}
					questions={questions}
					testInfo={testInfo}
				/>
					<Modal
						titleText='Попытка уже была начата и еще не завершена'
						actionText='продолжить попытку'
						cancelText='начать новую попытку'
						attempt={attempt}
						action='continueTest'
						cancel='newAttempt'
					/>
				</>
			);

		case isInoAttemptStarted(attempt):
			console.log('noAttemptStarted', attempt);
			return (
				<NoAttemptStarted
					currentTest={currentTest}
					id={id}
					questions={questions}
					testInfo={testInfo}
				/>
			);
	}
}
