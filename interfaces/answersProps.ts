export default interface IAnswersProps {
	index: number;
	text: string;
	isSelected: boolean;
	answerId: string;
	typeQuestion:
		| 'Обычный вопрос'
		| 'Вопрос с ответом пользователя'
		| 'Вопрос с множеством ответов';
}
