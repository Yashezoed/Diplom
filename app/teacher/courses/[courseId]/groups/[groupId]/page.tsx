import Header from '@/components/ui/Header';
import ProfileCard from '@/components/ui/ProfileCard';

export default async function GroupPage({
	searchParams,
	params
}: {
	searchParams: Promise<{
		nameGroup: string;
	}>;
	params: Promise<{
		courseId: number;
		groupId: number;
	}>
}) {
	const { nameGroup } = await searchParams;
	const { courseId, groupId} = await params

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
					link={`/teacher/courses/${courseId}/groups/${groupId}/students`}
				/>
			</div>
		</>
	);
}
