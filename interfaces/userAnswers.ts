export interface IuserAnswers {
	testId: number;
	userResponesTest: UserResponesTest[];
	studentId?: number;
	idResult: number;
}

export interface UserResponesTest {
	questId: number;
	userRespones: [string | null];
}
