import ResultTest from '@/components/pages/student/resultTest';
import { fetchResultTests } from '@/lib/api/test';

export default async function Page({
	searchParams
}: {
	searchParams: {
		resultId: number;
		result: number;
		evaluationName: string;
	};
}) {
	const { evaluationName, result, resultId } = await searchParams;

	console.log(evaluationName);
	console.log(result);
	console.log(resultId);

	const data = await fetchResultTests(resultId);
	console.log(data);

	return <ResultTest />;
}
