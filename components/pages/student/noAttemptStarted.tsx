import { createAttempt } from '@/lib/api/test';
import Test from './test';
import isError from '@/lib/api/isError';
import { IListQuestions } from '@/interfaces/listQuestions';
import { ILessonDescription } from '@/interfaces/lessonDescription';

export default async function NoAttemptStarted({
	id,
	questions,
	testInfo,
}: {
	id: number;
	questions: IListQuestions[];
	testInfo: ILessonDescription;
}) {
	const newAttemptId = await createAttempt(id);

	if (!isError(newAttemptId)) {

		return (
			<Test
				attemptId={newAttemptId.id}
				data={questions}
				minutes={testInfo.time}
			/>
		)
	}
}
