export type IresultTestData = resultTestData[];

export interface resultTestData {
	questDto: QuestDto;
	userRespones: UserRespone[];
	isCorrectQuest: boolean;
	categoryTasksDto: CategoryTasksDto;
}

export interface QuestDto {
	id: number;
	name: string;
	info: string;
}

export interface UserRespone {
	id: number;
	answerText: string;
	isCorrectAnswer: boolean;
	isResponeUser: boolean;
}

export interface CategoryTasksDto {
	id: number;
	name: string;
}
