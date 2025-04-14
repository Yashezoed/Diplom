
export interface ITestResults {
	id: number;
	user: string; //хз что за тип
	test: Test;
	result: Result[];
}

export interface Test {
	id: number;
	name: string;
}

export interface Result {
	idUserRespones: number;
	result: number;
	evaluationName: string;
	attempts: number;
}
