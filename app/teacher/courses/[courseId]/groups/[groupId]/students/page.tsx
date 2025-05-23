import Header from '@/components/ui/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import isError from '@/lib/api/isError';
import fetchStudents from '@/lib/api/teacher/students';
import { User } from 'lucide-react';
import Link from 'next/link';

export default async function StudentsPage({
	params
}: {
	params: {
		courseId: number;
		groupId: number;
	};
}) {
	const { courseId, groupId } = await params;
	const data = await fetchStudents(groupId);

	return (
		<>
			<Header title='Студенты' />
			<div className='h-[calc(100%-30px)] flex justify-between pt-[70px]'>
				<ScrollArea className='w-[50%]'>
					{!isError(data) &&
						data.map((student) => (
							<Link
								href={{
									pathname: `/teacher/courses/${courseId}/groups/${groupId}/students/${student.id}`,
									query: { studentName: student.fullName }
								}}
								className='flex items-center gap-[10px] pb-[20px]'
								key={student.id}
							>
								<User size={60} />
								<div className='w-full flex justify-between text-wrap text-[24px] font-medium bg-[#D9D9D9] rounded-[15px] py-[15px] px-[25px]'>
									<p>{student.fullName}</p>
								</div>
							</Link>
						))}
				</ScrollArea>
			</div>
		</>
	);
}