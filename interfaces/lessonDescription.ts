import { IQuestion } from "./question";

export interface ILessonDescription {
	infoTest: string;
	quests: IQuestion[];
	id: number;
	name: string;
}