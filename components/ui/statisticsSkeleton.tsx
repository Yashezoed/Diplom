import { ScrollArea } from "./scroll-area";
import { Select, SelectTrigger } from "./select";
import { Skeleton } from "./skeleton";


export default function StatisticsSkeleton() {
	return (
		<div className='mt-[30px] flex flex-col h-[calc(100%-125px)]'>
			<div className='flex items-end justify-between pb-[20px]'>
				<div className='w-[363px]'>
					<Skeleton className='h-[42px] mb-[10px] ' />
					<Select disabled>
						<SelectTrigger>
							<Skeleton className='min-w-[268px] h-[40px]' />
						</SelectTrigger>
					</Select>
				</div>
				<Skeleton className='h-[44px] w-[447px]' />
			</div>

			<ScrollArea className='max-w-[1069px]'>
				<div className='flex flex-col gap-[25px]'>
					{[...Array(4)].map((_, idx) => (
						<div
							key={idx}
							className='h-[71px] items-center border border-2 rounded-[15px] border-black p-[10px]'
						>
							<Skeleton className='w-full h-full ' />
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
