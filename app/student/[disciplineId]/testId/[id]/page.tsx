'use server';

import fetchLesson from '@/lib/api/fetchLesson';
import { checkingAttempt } from '@/lib/api/test';
import isError from '@/lib/api/isError';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { isIattemptStarted, isIcompletedAttempt, isInoAttemptStarted } from '@/interfaces/checkingAttempt';

export default async function page({
	params
}: {
	params: {
		disciplineId: number;
		id: number;
	};
}) {
	const { disciplineId, id } = await params;

	const testInfo = await fetchLesson(id); //информация о тесте
	const attempt = await checkingAttempt(id);

	switch (true) {
		case isInoAttemptStarted(attempt):
			if (!isError(testInfo)) {
				return (
					<>
						<div className=''>
							{`${testInfo.discipline.name} ${testInfo.name} время
							на прохождение теста ${testInfo.time} минуты`}
						</div>
						<Link
							href={`/student/${disciplineId}/testId/${id}/test`}
						>
							<Button variant='default' size={'lg'}>
								Начать тест
							</Button>
						</Link>
					</>
				);
			}
		case isIcompletedAttempt(attempt):
			return (
				<>
					<p className=''>У вас есть завершенная попытка</p>
					<Link
						href={`/student/${disciplineId}/testId/${id}/test/resultTest`}
					>
						<Button variant='default' size={'lg'}>
							Посмотреть результат
						</Button>
					</Link>
					<Link href={`/student/${disciplineId}/testId/${id}/test`}>
						<Button variant='default' size={'lg'}>
							Начать новую попытку
						</Button>
					</Link>
				</>
			);
		case isIattemptStarted(attempt):
			return (
				<>
					<p className=''>У вас есть активная попытка</p>
					<Link
						href={`/student/${disciplineId}/testId/${id}/test`}
					>
						<Button variant='default' size={'lg'}>
							Продолжить тест
						</Button>
					</Link>
				</>
			);
	}


}
