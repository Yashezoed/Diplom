export interface IResults {
	user: User;
	result: number | null;
}

export interface User {
	id: number;
	fullName: string;
}
