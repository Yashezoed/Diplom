import { IQuestion } from "./question";

export interface ILessonDescription {
	infoTest: string;
	quests: IQuestion[];
	discipline: {
		tests: string,
		users: string,
		id: number,
		name: string
	}
	id: number;
	name: string;
}