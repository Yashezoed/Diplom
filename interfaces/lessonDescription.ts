export interface ILessonDescription {
	infoTest: string;
	discipline: Discipline;
	time: number;
	evaluationDtos: EvaluationDto[];
	isCheck: boolean;
	id: number;
	name: string;
}

export interface Discipline {
	tests: string;
	users: string;
	id: number;
	name: string;
}

export interface EvaluationDto {
	evaluationName: string;
	percent: number;
}
