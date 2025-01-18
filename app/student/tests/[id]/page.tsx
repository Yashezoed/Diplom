import Tests from '@/components/pages/tests';

export default async  function Page({
	searchParams
}: {
	searchParams: {
		id: number;
		title: string;
	};
}) {
	const props = await searchParams;
	return  (
		<>
			<Tests id={props.id} title={props.title} />
		</>
	);
}
