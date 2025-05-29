import StudentLayout from '@/components/layout/studentLayout';
import Details from '@/components/pages/student/details';
import isError from '@/lib/api/isError';
import { fetchResultTests } from '@/lib/api/test';

export default async function page({
	searchParams
}: {
	searchParams: {
		testName: string;
		id: number;
	};
}) {
	const { testName, id } = await searchParams;
	const data = await fetchResultTests(id);

	return (
		<StudentLayout title={testName}>
			{!isError(data) && <Details data={data} />}
		</StudentLayout>
	);
}
