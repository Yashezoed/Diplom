/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserResponesTest } from './userAnswers';

export interface IcompletedAttempt {
	idUserResponses: number;
	result: number;
	evaluationName: string;
	attempts: number;
}

export interface IattemptStarted {
	second: number;
	minutes: number;
	idResult: number;
	testId: number;
	userResponesTest: UserResponesTest[];
}

export interface InoAttemptStarted {
	isAttempt: true;
}

//typeGuards

export function isIcompletedAttempt(
	attempt: any
): attempt is IcompletedAttempt {
	return (
		typeof attempt === 'object' &&
		attempt !== null &&
		typeof attempt.result === 'number' &&
		typeof attempt.evaluationName === 'string' &&
		typeof attempt.attempts === 'number'
	);
}

export function isIattemptStarted(attempt: any): attempt is IattemptStarted {
	return (
		typeof attempt === 'object' &&
		attempt !== null &&
		typeof attempt.second === 'number' &&
		typeof attempt.minutes === 'number' &&
		typeof attempt.idResult === 'number' &&
		typeof attempt.testId === 'number' &&
		Array.isArray(attempt.userResponesTest)
	);
}

export function isInoAttemptStarted(
	attempt: any
): attempt is InoAttemptStarted {
	return (
		typeof attempt === 'object' &&
		attempt !== null &&
		attempt.isAttempt === true
	);
}
