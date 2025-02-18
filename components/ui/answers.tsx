import IAnswersProps from '@/interfaces/answersProps';
import useQuestionStore from '@/stores/useQuestionStore';
import React from 'react';


export default function Answers({
	text,
	index,
	isSelected,
	answerId

}: IAnswersProps) {
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	return (
		<button
			className={`flex items-center rounded-2xl w-full border-4 border-white text-white text-[22px] font-medium mr-auto p-[20px]
                ${isSelected ? 'bg-white' : 'bg-transparent'}
            `}
			onClick={() => selectAnswer(answerId)}
		>
			<span
				className={`${isSelected ? 'text-[#008AD1]' : 'text-white'}`}
			>{`${index}. ${text}`}</span>
		</button>
	);
}
