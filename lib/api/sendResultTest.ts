'use server';

import { auth } from "@/auth";
import { IError } from "@/interfaces/common";
import { IuserAnswers } from "@/interfaces/userAnswers";


export default async function sendResultTest(body: IuserAnswers): Promise<IuserAnswers | IError> {
	const session = await auth();

	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}ResultTest/studentPassedTest`;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.token}`
		},
		body: JSON.stringify(body)
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