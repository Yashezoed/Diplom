import StudentLayout from "@/components/layuout/studentLayout";
import { createAttempt } from "@/lib/api/test";
import { Suspense } from "react";
import Test from "./test";
import isError from "@/lib/api/isError";
import { IError } from "@/interfaces/common";
import { IListQuestions } from "@/interfaces/listQuestions";
import { ILessonDescription } from "@/interfaces/lessonDescription";
import { ITest } from "@/interfaces/test";

export default async function NoAttemptStarted({id, questions, testInfo, currentTest}: {id: number; questions: IError | IListQuestions[]; testInfo: ILessonDescription | IError; currentTest: ITest | undefined}) {
	const newAttemptId = await createAttempt(id);
			return !isError(questions) &&
				!isError(testInfo) &&
				currentTest &&
				!isError(newAttemptId) ? (
				<StudentLayout
					title={`${testInfo.discipline.name} | ${currentTest.name}`}
				>
					<Suspense fallback={<div>Загрузка...</div>}>
						<Test
							attemptId={newAttemptId.id}
							data={questions}
							minutes={testInfo.time}
						/>
					</Suspense>
				</StudentLayout>
			) : (
				<>Ошибка</>
			);
}