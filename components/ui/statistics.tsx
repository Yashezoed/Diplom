'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectItem
} from '@/components/ui/select';
import { IAVGScore } from '@/interfaces/AVGScore';
import { IError } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import { ITestResults } from '@/interfaces/testResults';
import isError from '@/lib/api/isError';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Statistics({
	data,
	AVGScore,
	results
}: {
	data: ICourse[] | [];
	AVGScore: IAVGScore;
	results: ITestResults[] | IError;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const disciplineId =
		Number(searchParams.get('disciplineId')) ||
		(data.length > 0 && data[0].id);

	const handleSelectChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('disciplineId', value);
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		data.length > 0 && (
			<div className=' mt-[30px] flex flex-col h-[calc(100%-10px)]'>
				<div className='flex items-end justify-between pb-[20px]'>
					<div className='w-[363px]'>
						<p className=' text-[28px] mb-[10px] font-medium'>
							Статистика по предмету
						</p>
						<Select
							defaultValue={disciplineId.toString()}
							onValueChange={handleSelectChange}
						>
							<SelectTrigger>
								<SelectValue className='min-w-[268px]' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{data.map((item) => (
										<SelectItem
											key={item.id}
											value={item.id.toString()}
										>
											{item.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<p className='text-[36px] font-medium text-wrap'>
						Средний результат {AVGScore.result.toFixed(0)}%
					</p>
				</div>
				<ScrollArea className='max-w-[1069px]'>
					<div className='flex flex-col gap-[25px]'>
						{!isError(results) &&
							results.map((item) => (
								<div
									key={item.idUserRespones}
									className='grid grid-cols-[70px_140px_minmax(150px,1fr)_280px] gap-4 items-center border border-2 rounded-[15px] border-black p-[10px]'
								>
									<span className='text-[24px] font-bold text-center '>
										{item.result.toFixed(0)}%
									</span>
									<p className='text-[24px] font-semibold text-center'>
										{new Date(
											item.dateFinish
										).toLocaleDateString()}
									</p>
									<p className='text-[24px] font-semibold text-center'>
										{item.nameTest}
									</p>
									<Link
										href={'#'}
									>
										<Button
											size={'sm'}
											className='w-fit px-[10px]'
										>
											Смотреть результат
										</Button>
									</Link>
								</div>
							))}
					</div>
				</ScrollArea>
			</div>
		)
	);
}
