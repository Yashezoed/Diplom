'use server';
import { AuthError } from 'next-auth';
import { signIn } from '../../auth.config';

export const Login = async (name: string, password: string) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			password
		})
	};

	try {
		const response = await fetch(
			'http://185.221.152.124:80/User/login',
			options
		);
		if (response.ok) {
			console.log('respone.json()', response);
			return await response.json(); //должен по идее возвращаться .json()
			// console.log('respone', response);
			/* const TOKEN = await response.json();
			const DECODED_TOKEN =  atob(TOKEN.split('.')[1]);

			console.log('!!!!!!!!!!!!!!!!!!!',JSON.parse(DECODED_TOKEN));
			return JSON.parse(DECODED_TOKEN); */
		} else {
			return { error: 'Authentication failed' };
		}
	} catch (error) {
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		console.log('Error', error);
	}
	return null;
};

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		return await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Не правильная почта или пароль.';
				default:
					return 'Непредвиденная ошибка.';
			}
		}
		throw error;
	}
}
