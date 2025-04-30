import IAnswersProps from '@/interfaces/answersProps';
import useQuestionStore from '@/stores/useQuestionStore';
import React from 'react';
import { Button } from './button';

export default function Answers({
	text,
	index,
	isSelected,
	answerId
}: IAnswersProps) {
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	return (
		<Button
			variant={'answer'}
			size={'default'}
			className={`flex justify-start w-full
                ${isSelected ? 'bg-accent' : 'bg-transparent'}
            `}
			onClick={() => selectAnswer(answerId)}
		>
			<span className='text-[22px] text-black text-left text-wrap'>{`${index}. ${text}`}</span>
		</Button>
	);
}
