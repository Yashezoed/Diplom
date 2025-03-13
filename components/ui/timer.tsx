'use client';
import { useEffect, useState } from 'react';
import { TimerIcon } from 'lucide-react';

interface TimerProps {
	seconds?: number;
	minutes: number;
	action: () => void;
}

export default function Timer({minutes, seconds, action }: TimerProps) {

	const initialTime = seconds ? minutes * 60 + seconds : minutes * 60;


	const [remainingTime, setRemainingTime] = useState<number | null>(null);

	useEffect(() => {
		// Проверяем, выполняется ли код на клиенте
		if (typeof window !== 'undefined') {
			const savedTime = localStorage.getItem('remainingTime');
			setRemainingTime(savedTime ? parseInt(savedTime, 10) : initialTime);
		}
	}, [initialTime]);

	useEffect(() => {
		if (remainingTime === null) return;

		if (remainingTime <= 0) {
			// Таймер истек
			action();
			return;
		}

		const interval = setInterval(() => {
			setRemainingTime((prev) => (prev !== null ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [remainingTime, action]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
			2,
			'0'
		)}`; // Форматируем время в MM:SS
	};

	if (remainingTime === null) return null;

	return (
		<div className='flex justify-center items-center'>
			<div className='flex w-[130px]'>
				<TimerIcon size={36} color='#ffffff' strokeWidth={2.25} />
				<p className='p-[5px] text-[28px] leading-8 font-semibold text-white max-w-[1040px]'>
					{formatTime(remainingTime)}
				</p>
			</div>
		</div>
	);
}
