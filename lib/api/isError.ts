import { IError } from "@/interfaces/common";

export default function isError(data: unknown): data is IError {
		return (
			typeof data === 'object' &&
			data !== null &&
			'status' in data &&
			typeof data.status === 'number' &&
			'message' in data &&
			typeof data.message === 'string'
		);
	}