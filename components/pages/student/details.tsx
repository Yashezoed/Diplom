'use client';
import Answers from '@/components/ui/answers';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import Questiontitle from '@/components/ui/questionTitle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IresultTestData } from '@/interfaces/resultTestData';
import { motion } from 'framer-motion';
import { ArrowUp, CircleCheck, CircleX } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Details({ data }: { data: IresultTestData }) {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const answers = data.verifiedUserRespones[currentQuestion];

	const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(
		null
	);

	const toggleImageSize = (index: number) => {
		setEnlargedImageIndex(enlargedImageIndex === index ? null : index);
	};

	return (
		<div className='mx-[80px] flex flex-col justify-between h-full '>
			<div className='flex flex-col overflow-hidden mt-[20px] '>
				<Questiontitle
					name={answers.questDto.name}
					info={answers.questDto.info}
				/>
				<div className='flex pt-[46px] overflow-hidden justify-between '>
					<ScrollArea className='flex-1 h-full '>
						{answers.userRespones &&
							answers.userRespones.map((answer, index) => {
								return (
									<div
										key={answer.id}
										className='flex items-center mb-[20px] gap-[20px]'
									>
										{answers.categoryTasksDto.id !== 3 ? (
											answer.isCorrectAnswer ? (
												<CircleCheck
													size={50}
													strokeWidth={1.5}
													color=' #00FF7F'
												/>
											) : (
												<CircleX
													size={50}
													strokeWidth={1.5}
													color='#C41E3A'
												/>
											)
										) : answers.isCorrectQuest ? (
											<CircleCheck
												size={50}
												strokeWidth={1.5}
												color='#00FF7F'
											/>
										) : (
											<CircleX
												size={50}
												strokeWidth={1.5}
												color='#C41E3A'
											/>
										)}
										<Answers
											key={answer.id}
											text={answer.answerText}
											index={index + 1}
											isSelected={answer.isResponeUser}
											answerId={answer.id.toString()}
											typeQuestion={
												data.verifiedUserRespones[
													currentQuestion
												].categoryTasksDto.id
											}
										/>
									</div>
								);
							})}
					</ScrollArea>
					{answers.questDto.pathImg.length !== 0 &&
						answers.questDto.pathImg.map((img, index) => {
							const isEnlarged = enlargedImageIndex === index;
							return (
								<motion.div
									key={index}
									className='ml-[20px]  cursor-pointer'
									onClick={() => toggleImageSize(index)}
									initial={false}
									animate={{
										width: isEnlarged ? 640 : 400,
										height: isEnlarged ? 440 : 300
									}}
									transition={{
										type: 'spring',
										stiffness: 200,
										damping: 20
									}}
									style={{ position: 'relative' }}
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${img}`}
										width={isEnlarged ? 600 : 400}
										height={isEnlarged ? 400 : 300}
										alt='изображение к вопросу'
										draggable={false}
										className='p-[20px] border-2 border-[#cecece] rounded-xl'
									/>
								</motion.div>
							);
						})}
				</div>
			</div>
			<div className='flex justify-between py-[20px]'>
				<div className='flex gap-[30px]'>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className='p-[10px] rounded-[39px] w-[280px] flex justify-around'
							>
								<p className='text-[28px] '>
									Вопрос {currentQuestion + 1}/
									{data.verifiedUserRespones.length}
								</p>
								<ArrowUp size={36} />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<div className='w-[280px] gap-y-[10px] grid grid-cols-5 justify-items-center '>
								{data.verifiedUserRespones.map(
									(answer, index) => {
										return (
											<button
												key={answer.questDto.id}
												onClick={() => {
													setCurrentQuestion(index);
												}}
												className={` m-[5px] text-[#fff] bg-[#5D5D5D] size-[30px] rounded-sm flex justify-center items-center !bg-[#D4D4D4] text-black
									${
										currentQuestion === index
											? 'outline outline-[3px] outline-primary outline-offset-[2px]'
											: ''
									}
									`}
											>
												{index + 1}
											</button>
										);
									}
								)}
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div className='flex justify-end gap-[12px]'>
					{currentQuestion + 1 < data.verifiedUserRespones.length && (
						<Button
							size={'medium'}
							onClick={() => {
								setCurrentQuestion(currentQuestion + 1);
							}}
						>
							Следующий вопрос
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
