import { auth } from '@/auth';
import { IError } from '@/interfaces/common';
import { ILessonDescription } from '@/interfaces/lessonDescription';

export default async function fetchLesson(
	id: number
): Promise<ILessonDescription | IError> {
	const session = await auth();
	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/Test/${id}/student`;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.token}`
		}
	};
	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`${response.status} ${response.statusText}`);
		}
	} catch (error: unknown) {
		return {
			status: 500,
			message: (error as Error).message
		};
	}
}
