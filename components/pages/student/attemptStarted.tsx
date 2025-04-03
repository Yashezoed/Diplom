'use client';
import Test from './test';
import { IattemptStarted } from '@/interfaces/checkingAttempt';
import { IListQuestions } from '@/interfaces/listQuestions';

export default function AttemptStarted({
	attempt,
	questions
}: {
	attempt: IattemptStarted;
	questions: IListQuestions[];
}) {
	return (
		<Test
			attemptId={attempt.idResult}
			data={questions}
			minutes={attempt.minutes}
			seconds={attempt.second}
			attempt={attempt}
		/>
	);
}
