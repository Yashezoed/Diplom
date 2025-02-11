import IAnswersProps from '@/interfaces/answersProps';
import React from 'react';


export default function Answers({
	text,
	index,
	isSelected,
	onSelect
}: IAnswersProps) {
	return (
		<button
			className={`flex items-center rounded-2xl w-full border-4 border-white text-white text-[22px] font-medium mr-auto p-[20px]
                ${isSelected ? 'bg-white' : 'bg-transparent'}
            `}
			onClick={onSelect}
		>
			<span className={`${isSelected ? 'text-[#008AD1]' : 'text-white'}`}>{`${index}. ${text}`}</span>
		</button>
	);
}
