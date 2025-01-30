
export interface ILessonDescription {
	infoTest: string;
	discipline: {
		tests: string,
		users: string,
		id: number,
		name: string
	}
	id: number;
	name: string;
}