import { UserResponesTest } from "./userAnswers";

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
	noAttemptStarted: true
};