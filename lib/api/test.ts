'use server';

import { auth } from "@/auth";
import { IattemptStarted, IcompletedAttempt, InoAttemptStarted } from "@/interfaces/checkingAttempt";
import { IError } from "@/interfaces/common";
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
// Проверить наличие начатой попытки
export const checkingAttempt = async (id: number): Promise<InoAttemptStarted | IattemptStarted | IcompletedAttempt | IError> => {
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
		console.log('test response =>',  response);

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


export const createAttempt = async (id: number): Promise<number | IError> => {
	const session = await auth();
	const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}ResultTest/createAttempt/${id}`;
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
