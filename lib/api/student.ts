'use server';

import { auth } from '@/auth';
import { IError } from '@/interfaces/common';
import { IInfoStudent } from '@/interfaces/infoStudent';

export default async function getInfoStudent(): Promise<IInfoStudent | IError> {
	const session = await auth();
	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}Group/student`;
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
