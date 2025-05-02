export interface ILessonDescription {
	infoTest: string;
	discipline: Discipline;
	time: number;
	userAttempt: number;
	id: number;
	name: string;
}

export interface Discipline {
	id: number;
	name: string;
}

