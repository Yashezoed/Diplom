import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import isError from "@/lib/api/isError";
import fetchDisciplines from "@/lib/api/teacher/courses";
import Link from "next/link";

export default async function CoursesPage() {

	const data = await fetchDisciplines();
	return (
		<>
			<Header title={'Ваши курсы'} />
			<ScrollArea className='h-full py-10 rounded-3xl px-[80px]'>
				<div className='grid grid-cols-3 gap-[64px]'>
					{!isError(data) && data.map((card) => (
						<Button
							asChild
							variant='default'
							size={'lg'}
							className='text-[36px] w-full '
							key={card.id}
						>
							<Link
								href={{
									pathname: `/teacher/courses/${card.id}/groups`
								}}
							>
								{card.name}
							</Link>
						</Button>
					))}
					{isError(data) && <>Перезагрузите страницу</>}
				</div>
			</ScrollArea>
		</>
	);
}
