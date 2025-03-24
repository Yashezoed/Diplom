'use client'

import { IattemptStarted } from "@/interfaces/checkingAttempt";
import { IError } from "@/interfaces/common";
import { ILessonDescription } from "@/interfaces/lessonDescription";
import { IListQuestions } from "@/interfaces/listQuestions";
import { ITest } from "@/interfaces/test";
import AttemptStarted from "../pages/student/attemptStarted";
import Modal from "./modal";

export default function ifAttemptStarted({attempt, currentTest, questions, testInfo}: {attempt: IattemptStarted, currentTest: ITest | undefined, questions: IListQuestions[] | IError, testInfo: ILessonDescription | IError}) {
	console.log('Данные ответов на сервере =>', attempt.userResponesTest);
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


					<AttemptStarted
						attempt={attempt}
						currentTest={currentTest}
						questions={questions}
						testInfo={testInfo}
					/>
				</>
			);
}