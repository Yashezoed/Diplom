'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
	IattemptStarted,
	IcompletedAttempt,
	isIcompletedAttempt
} from '@/interfaces/checkingAttempt';
import useQuestionStore from '@/stores/useQuestionStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Modal({
	titleText,
	actionText,
	cancelText,
	action,
	cancel,
	attempt,
}: {
	triggerText?: string;
	titleText: string;
	actionText: string;
	cancelText: string;
	attempt: IcompletedAttempt | IattemptStarted;
	action: 'redirectToResult' | 'continueTest';
	cancel: 'newAttempt';
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace, refresh } = useRouter();

	const [isOpen, setIsOpen] = useState(true);

	const clearStore = useQuestionStore((state) => state.clearStore);

	const continueTest = () => {};

	const newAttempt = () => {
		// clearStore();
		refresh();

	};

	const redirectToResult = () => {
		try {
			const params = new URLSearchParams(searchParams);
			if (isIcompletedAttempt(attempt)) {
				params.delete('newAttempt');
				params.set('idUserRespones', `${attempt.idUserRespones}`);
				params.set('result', `${attempt.result}`);
				params.set('evaluationName', `${attempt.evaluationName}`);
				params.set('attempts', `${attempt.attempts}`);
				replace(`${pathname}/resultTest?${params.toString()}`);
				clearStore();
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className='max-w-[1120px] max-h-[418px] !rounded-[20px]'>
				<AlertDialogHeader className='items-center'>
					<AlertDialogTitle className='text-[64px] font-semibold text-center'>
						{titleText}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter className='sm:justify-center justify-center gap-[80px] '>
					<AlertDialogAction
						className='bg-white text-black hover:bg-[#3F5FD7] hover:text-white hover:border-none w-[421px] h-[103px] border-[3px] border-black rounded-[15px] text-[40px] font-semibold'
						onClick={
							action === 'redirectToResult'
								? redirectToResult
								: action === 'continueTest'
								? continueTest
								: () => {}
						}
					>
						{actionText}
					</AlertDialogAction>
					<AlertDialogCancel
						onClick={
							cancel === 'newAttempt' ? () => newAttempt() : () => {}
						}
						className='bg-white text-black hover:bg-[#3F5FD7] hover:text-white hover:border-none w-[421px] h-[103px] border-[3px] border-black rounded-[15px] text-[40px] font-semibold'
					>
						{cancelText}
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
