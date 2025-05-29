export interface IuserAnswers {
	testId: number;
	userResponesTest: UserResponesTest[];
	idResult: number;
}

export interface UserResponesTest {
	questId: number;
	userRespones: [string] | null;
}
