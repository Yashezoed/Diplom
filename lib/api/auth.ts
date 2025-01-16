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
			return await response.json();
		} else {
			return { error: 'Authentication failed' };
		}
	} catch (error) {
		console.log('Error', error);
	}
	return null;
};

export const authenticate = async (
	prevState: string | undefined,
	formData: FormData
) => {
	console.log(formData);
	try {
		await signIn('credentials', formData);
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
	} finally {
		// redirect('/student');
	}
};
