'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';

export function Diagram({
	numberOfRightAnswers,
	numberOfWrongAnswers,
	result
}: {
	numberOfRightAnswers: number;
	numberOfWrongAnswers: number;
	result: number;
}) {
	console.log(numberOfRightAnswers, numberOfWrongAnswers);

	const chartData = [
		{ type: 'Правильно', quantity: numberOfRightAnswers, fill: '#8297E5' },
		{ type: 'Неправильно', quantity: numberOfWrongAnswers, fill: '#CFCFCF' }
	];

	const chartConfig = {
		right: {
			label: 'Правильно ',
			color: '#8297E5'
		},
		wrong: {
			label: 'Неправильно ',
			color: '#CFCFCF'
		}
	};

	return (
		<ChartContainer
			config={chartConfig}
			className='aspect-square  h-[450px] max-h-[450px]'
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={chartData}
					dataKey='quantity'
					nameKey='type'
					innerRadius={90}
					strokeWidth={5}
					startAngle={90}
					endAngle={-270}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor='middle'
										dominantBaseline='middle'
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className='fill-black text-[58px] font-bold'
										>
											{result}%
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
