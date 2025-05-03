import IAnswersProps from '@/interfaces/answersProps';
import useQuestionStore from '@/stores/useQuestionStore';
import React, { useState } from 'react';
import { Button } from './button';
import { useDebouncedCallback } from 'use-debounce';

export default function Answers({
	text,
	index,
	isSelected,
	answerId,
	typeQuestion
}: IAnswersProps) {
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	const selectAnswers = useQuestionStore((state) => state.selectAnswers)

	const selectedAnswers = useQuestionStore((state) => state.selectedAnswers);

	const [userInput, setUserInput] = useState(() => {
		if (selectedAnswers.length === 0) return '';

		const answer = selectedAnswers[index];
		if (!answer || !answer.userRespones)
			return '';

		return answer.userRespones[0];
	});
	const debouncedSelectAnswer = useDebouncedCallback((value) => {
		selectAnswer(value);
	}, 500);

	switch (typeQuestion) {
		case 'Обычный вопрос':
			return (
				<Button
					variant={'answer'}
					size={'default'}
					className={`flex justify-start w-full
                ${isSelected ? 'bg-accent' : 'bg-transparent'}`}
					onClick={() => selectAnswer(answerId)}
				>
					<span className='text-[22px] text-black text-left text-wrap'>{`${index}. ${text}`}</span>
				</Button>
			);
		case 'Вопрос с ответом пользователя':
			return (
				<input
					type='text'
					value={userInput}
					onChange={(e) => {
						setUserInput(e.target.value);
						debouncedSelectAnswer(e.target.value);
					}}
					placeholder='Введите ваш ответ'
					className='border border-gray-300 rounded px-3 py-2 w-full text-[22px]'
				/>
			);
		case 'Вопрос с множеством ответов':
			return (
				<Button
					variant={'answer'}
					size={'default'}
					className={`flex justify-start w-full
                ${isSelected ? 'bg-accent' : 'bg-transparent'}`}
					onClick={() => selectAnswers(answerId)}
				>
					<span className='text-[22px] text-black text-left text-wrap'>{`${index}. ${text}`}</span>
				</Button>
			);
		default:
			return null;
	}
}
