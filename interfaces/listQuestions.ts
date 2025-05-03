export interface IListQuestions {
	categoryTasks: CategoryTasks;
	tests: string;
	answers: Answer[];
	id: number;
	name: string;
	info: string;
	pathImg: string[];
}

export interface CategoryTasks {
	id: number;
	name:
		| 'Обычный вопрос'
		| 'Вопрос с ответом пользователя'
		| 'Вопрос с множеством ответов';
}

export interface Answer {
	id: number;
	answerText: string;
	pathPhoto: string[];
}
