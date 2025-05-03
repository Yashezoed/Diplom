'use client';
import { IListQuestions } from '@/interfaces/listQuestions';
import { UserResponesTest } from '@/interfaces/userAnswers';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IAnswer {
	questId: number;
	userRespones: string[] | null;
}

interface IQuestionStore {
	currentQuestion: number;
	currentQuestionId: string;
	selectedAnswers: IAnswer[];
	initializeStore: (data: IListQuestions[]) => void;
	setServerData: (data: UserResponesTest[]) => void;
	nextQuestion: () => void;
	changeCurrentQuestion: (index: number, id: string) => void;
	selectAnswer: (answerId: string) => void;
	selectAnswers: (answerId: string) => void;
	clearStore: () => void;
}

const useQuestionStore = create<IQuestionStore>()(
	persist(
		immer((set, get) => ({
			currentQuestion: 0,
			currentQuestionId: '',
			selectedAnswers: [],
			initializeStore: (data: IListQuestions[]) => {
				set((state) => {
					state.currentQuestion = 0;
					state.currentQuestionId = data[0].id.toString();
					const initialAnswers: IAnswer[] = data.map((answer) => {
						return {
							questId: Number(answer.id),
							userRespones: null
						};
					});
					state.selectedAnswers = initialAnswers;
				});
			},
			setServerData: (data: UserResponesTest[]) => {
				set((state) => {
					const serverData: IAnswer[] = data.map((answer) => {
						return {
							questId: answer.questId,
							userRespones: answer.userRespones
						};
					});
					state.selectedAnswers = serverData;
				});
			},
			nextQuestion: () => {
				set((state) => {
					state.currentQuestion += 1;
					state.currentQuestionId = (
						+state.currentQuestionId + 1
					).toString();
				});
			},
			changeCurrentQuestion: (index: number, id: string) =>
				set((state) => {
					state.currentQuestion = index;
					state.currentQuestionId = id;
				}),
			selectAnswer: (answerId: string) =>
				set((state) => {
					const questionId = get().currentQuestionId;
					const currentQuestion = get().currentQuestion;
					state.selectedAnswers[currentQuestion] = {
						questId: Number(questionId),
						userRespones: [answerId]
					};
				}),
			selectAnswers: (answerId: string) =>
				set((state) => {
					const questionIndex = state.currentQuestion; // индекс текущего вопроса
					const questionId = state.currentQuestionId;

					// Клонируем массив, чтобы не мутировать напрямую
					const updatedSelectedAnswers = [...state.selectedAnswers];

					// Получаем текущий объект для вопроса
					const currentAnswer = updatedSelectedAnswers[
						questionIndex
					] || {
						questId: Number(questionId),
						userRespones: []
					};

					// Если userRespones null, инициализируем пустым массивом
					const currentResponses: string[] = currentAnswer.userRespones ?? [];

					// Проверяем, выбран ли уже answerId
					const isSelected = currentResponses.includes(answerId);

					let newResponses: string[];
					if (isSelected) {
						// Убираем answerId из массива (снимаем выбор)
						newResponses = currentResponses.filter(
							(id) => id !== answerId
						);
					} else {
						// Добавляем answerId в массив
						newResponses = [...currentResponses, answerId];
					}

					// Обновляем объект для текущего вопроса
					updatedSelectedAnswers[questionIndex] = {
						questId: currentAnswer.questId || Number(questionId),
						userRespones: newResponses
					};

					return {
						selectedAnswers: updatedSelectedAnswers
					};
				}),
			clearStore: () => {
				set({
					currentQuestion: 0,
					currentQuestionId: '',
					selectedAnswers: []
				});
				localStorage.removeItem('test-storage');
				// if (typeof window !== 'undefined') {
				// 	localStorage.removeItem('test-storage');
				// }
			}
		})),
		{
			name: 'test-storage'
		}
	)
);

export default useQuestionStore;
