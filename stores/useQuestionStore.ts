import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IQuestionStore {
	currentQuestion: number;
	currentQuestionId: string;
	selectedAnswers: { [questionIndex: string]: string | null }; // Объект для хранения выбранных ответов
	nextQuestion: () => void;
	changeCurrentQuestion: (to: number) => void;
	selectAnswer: (answerId: string) => void;
	setCurrentQuestionId: (id: string) => void;
	//modal
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	initializeSelectedAnswers: (questionIds: string[]) => void; // Добавляем функцию для инициализации
}

const useQuestionStore = create<IQuestionStore>()(
	persist(
		immer((set, get) => ({
			currentQuestion: 0,
			currentQuestionId: '',
			selectedAnswers: {}, // Изначально нет выбранных ответов
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
					state.selectedAnswers[questionId] = answerId; // Сохраняем answerId для текущего вопроса
				}),
			setCurrentQuestionId: (id: string) =>
				set({ currentQuestionId: id }),
			//modal
			isModalOpen: false,
			openModal: () => set({ isModalOpen: true }),
			closeModal: () => set({ isModalOpen: false }),
			initializeSelectedAnswers: (questionIds: string[]) => {
				set((state) => {
					// Создаем объект, где ключи - это questionIds, а значения - null
					const initialAnswers: {
						[questionIndex: string]: string | null;
					} = {};
					questionIds.forEach((id) => {
						initialAnswers[id] = null;
					});
					state.selectedAnswers = initialAnswers;
				});
			}
		})),
		{
			name: 'test-storage'
		}
	)
);

export default useQuestionStore;
