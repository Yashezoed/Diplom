import ResultTest from '@/components/pages/student/resultTest';
import isError from '@/lib/api/isError';
import { fetchResultTests } from '@/lib/api/test';

export interface Iparams {
	id: number;
	testName: string;
	result: number;
	evaluationName: string;
	attempts: number | null;
}

export default async function Page({
	searchParams
}: {
	searchParams: Promise<Iparams>
}) {
	const { id } = await searchParams;

	const data = await fetchResultTests(id);

	return !isError(data) && <ResultTest data={data} params={await searchParams} />;
}
