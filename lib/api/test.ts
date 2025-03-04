'use server';

import { auth } from "@/auth";
import { IError } from "@/interfaces/common";
import { IResultTest } from "@/interfaces/ResultTest";
import { IresultTestData } from '@/interfaces/resultTestData';
import { IuserAnswers } from "@/interfaces/userAnswers";

// Отправить результат теста

// TODO понять почему не работает метод
export const sendResultTest = async (body: IuserAnswers): Promise<null | IError> => {
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
		console.log('body =>', JSON.stringify(body));

		console.log('response =>',await response);

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
};

// Получить результат теста

export async function fetchResultTests(
	id: number
): Promise<IresultTestData | IError> {
	const session = await auth();
	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}ResultTest/resultDetails/${id}`;
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

//TODO дописать метод
export const CheckingAttempt = async (id: number): Promise<IResultTest | IError> => {
	const session = await auth();
	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}ResultTest/checkingAttempt/${id}`;
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
};

