import Header from '@/components/ui/Header';
import ProfileCard from '@/components/ui/ProfileCard';

export default async function GroupPage({
	searchParams,
	params
}: {
	searchParams: {
		nameGroup: string;
	};
	params: {
		courseId: number;
		groupId: number;
	}
}) {
	const { nameGroup } = await searchParams;
	const { courseId, groupId} = params
	console.log(searchParams.nameGroup);

	return (
		<>
			<Header title={nameGroup} />
			<div className='h-[calc(100%-60px)] flex items-center gap-[160px] py-[44px] px-[150px] justify-between '>
				<ProfileCard
					img='test'
					text='Тесты'
					link={`/teacher/courses/${courseId}/groups/${groupId}/tests`}
				/>
				<ProfileCard
					img='user'
					text='Студенты'
					link='#'
				/>
			</div>
		</>
	);
}
