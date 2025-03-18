import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IQuestionStore {
	currentQuestion: number;
	currentQuestionId: string;
	selectedAnswers: { [questionIndex: string]: string | null };
	nextQuestion: () => void;
	changeCurrentQuestion: (to: number) => void;
	selectAnswer: (answerId: string) => void;
	setCurrentQuestionId: (id: string) => void;
	initializeSelectedAnswers: (questionIds: string[]) => void;
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
			selectedAnswers: {},
			nextQuestion: () => {
				set((state) => {
					state.currentQuestion += 1;
				});
			},
			changeCurrentQuestion: (to: number) =>
				set((state) => {
					state.currentQuestion = to;
				}),
			selectAnswer: (answerId: string) =>
				set((state) => {
					const questionId = get().currentQuestionId;
					state.selectedAnswers[questionId] = answerId;
				}),
			setCurrentQuestionId: (id: string) =>
				set({ currentQuestionId: id }),
			initializeSelectedAnswers: (questionIds: string[]) => {
				set((state) => {
					const initialAnswers: {
						[questionIndex: string]: string | null;
					} = {};
					questionIds.forEach((id) => {
						initialAnswers[id] = null;
					});
					state.selectedAnswers = initialAnswers;
				});
			},
			//один бог знает как их использовать
			updateSelectedAnswers: (newAnswers: {
				[key: string]: string | null;
			}) =>
				set((state) => {
					state.selectedAnswers = newAnswers;
				}),
			clearStore: () => {
				set({
					currentQuestion: 0,
					currentQuestionId: '',
					selectedAnswers: {},
				});
				localStorage.removeItem('test-storage');
			}
		})),
		{
			name: 'test-storage'
		}
	)
);

export default useQuestionStore;
