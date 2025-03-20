import StudentLayout from "@/components/layuout/studentLayout";
import { Suspense } from "react";
import Test from "./test";
import isError from "@/lib/api/isError";
import { IError } from "@/interfaces/common";
import { ILessonDescription } from "@/interfaces/lessonDescription";
import { ITest } from "@/interfaces/test";
import { IattemptStarted } from "@/interfaces/checkingAttempt";
import { IListQuestions } from "@/interfaces/listQuestions";

export default function AttemptStarted({testInfo, currentTest, attempt, questions}: { testInfo: IError | ILessonDescription, currentTest: undefined | ITest, attempt: IattemptStarted, questions: IError | IListQuestions[]}) {
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
}
