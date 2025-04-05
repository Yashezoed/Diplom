'use client';
import { IListQuestions } from '@/interfaces/listQuestions';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IAnswer {
	questId: number;
	userRespones: [string] | null;
}

interface IQuestionStore {
	currentQuestion: number;
	currentQuestionId: string;
	selectedAnswers: IAnswer[];
	initializeStore: (data: IListQuestions[]) => void;
	nextQuestion: () => void;
	changeCurrentQuestion: (index: number, id: string) => void;
	selectAnswer: (answerId: string) => void;
	updateSelectedAnswers: (newAnswers: {
		[key: string]: string | null;
	}) => void;
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
					const initialAnswers = data.map((answer) => {
						return {
							questId: Number(answer.id),
							userRespones: null
						};
					});
					state.selectedAnswers = initialAnswers;
				});
			},
			nextQuestion: () => {
				set((state) => {
					state.currentQuestion += 1;
					state.currentQuestionId = (+state.currentQuestionId + 1).toString();
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
			updateSelectedAnswers: (newAnswers: {
				[key: string]: string | null;
			}) =>
				set((state) => {
					// state.selectedAnswers = newAnswers;
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
