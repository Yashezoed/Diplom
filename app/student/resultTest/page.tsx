import ResultTest from '@/components/pages/student/resultTest';
import isError from '@/lib/api/isError';
import { fetchResultTests } from '@/lib/api/test';

export default async function Page({
	searchParams
}: {
	searchParams: {
		id: number,
		testName: string
	};
}) {
	const { id, testName } = await searchParams;
	const data = await fetchResultTests(id);


	return !isError(data) && <ResultTest data={data} testName={testName} />;
}
