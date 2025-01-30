export interface IListQuestions {
	categoryTasks: { id: number; name: string };
	tests: string;
	answer: {
		id: number,
		answerText: string,
		questsId: number,
		quest: string,
		isCorrectAnswer: boolean
	};
	id: number;
	name: string;
	info: string;
}
