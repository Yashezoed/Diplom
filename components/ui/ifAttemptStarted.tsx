'use client';

import { IattemptStarted } from '@/interfaces/checkingAttempt';
import { IError } from '@/interfaces/common';
import { ILessonDescription } from '@/interfaces/lessonDescription';
import { IListQuestions } from '@/interfaces/listQuestions';
import { ITest } from '@/interfaces/test';
import AttemptStarted from '../pages/student/attemptStarted';
import Modal from './modal';
import NoAttemptStarted from '../pages/student/noAttemptStarted';
import { useState } from 'react';

export default function IfAttemptStarted({
	attempt,
	currentTest,
	questions,
	testInfo,
	id
}: {
	attempt: IattemptStarted;
	currentTest: ITest | undefined;
	questions: IListQuestions[] | IError;
	testInfo: ILessonDescription | IError;
	id: number;
}) {

	return (
		<>
			<Modal
				titleText='Попытка уже была начата и еще не завершена'
				actionText='продолжить попытку'
				cancelText='начать новую попытку'
				attempt={attempt}
				action='continueTest'
				cancel='newAttempt'
			/>

			{selectedAction === 'continueTest' && (
				<AttemptStarted
					attempt={attempt}
					currentTest={currentTest}
					questions={questions}
					testInfo={testInfo}
				/>
			)}

			{selectedAction === 'newAttempt' && (
				<NoAttemptStarted
					currentTest={currentTest}
					id={id}
					questions={questions}
					testInfo={testInfo}
				/>
			)}
		</>
	);
}
