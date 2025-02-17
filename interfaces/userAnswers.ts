export interface IuserAnswers {
	testId: number;
	userResponesTest: UserResponesTest[];
}

export interface UserResponesTest {
	questId: number;
	userRespones: [string | null];
}
