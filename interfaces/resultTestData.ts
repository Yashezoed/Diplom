export interface IresultTestData {
	numberOfIncorrect: number;
	numberOfCorrect: number;
	verifiedUserRespones: VerifiedUserRespone[];
}

export interface VerifiedUserRespone {
	userRespones?: UserRespone[];
	questDto: QuestDto;
	isCorrectQuest: boolean;
	categoryTasksDto: CategoryTasksDto;
}

export interface UserRespone {
	id: number;
	answerText: string;
	isCorrectAnswer: boolean;
	isResponeUser: boolean;
	pathImg: string;
}

export interface QuestDto {
	id: number;
	name: string;
	info: string;
	pathImg: string;
}

export interface CategoryTasksDto {
	id: number;
	name: 'Обычный вопрос'
		| 'Вопрос с ответом пользователя'
		| 'Вопрос с множеством ответов';
}
