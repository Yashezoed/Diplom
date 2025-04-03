import ResultTest from '@/components/pages/student/resultTest';
import { fetchResultTests } from '@/lib/api/test';

export default async function Page({
	searchParams
}: {
	searchParams: {
		idUserRespones: number;
		result: number;
		evaluationName: string;
		attempts: number;
	};
}) {
	const { evaluationName, result, idUserRespones, attempts } = await searchParams;

	console.log(result);
	console.log(evaluationName);
	console.log(attempts);

	const data = await fetchResultTests(idUserRespones);
	console.log(data);

	return <ResultTest />;
}
