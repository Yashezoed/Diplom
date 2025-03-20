"use client"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IcompletedAttempt } from '@/interfaces/checkingAttempt';
import useQuestionStore from '@/stores/useQuestionStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function MyAlertDialogClient({
	titleText,
	actionText,
	cancelText,
	attempt,
	action,
	cancel
}: {
	triggerText?: string;
	titleText: string;
	actionText: string;
	cancelText: string;
	attempt: IcompletedAttempt;
	action: 'redirectToresult';
	cancel: 'reload'

}) {
		const pathname = usePathname();
		const searchParams = useSearchParams();
		const { replace } = useRouter();
		const clearStore = useQuestionStore((state) => state.clearStore);
		const redirectToResult = () => {
			const params = new URLSearchParams(searchParams);
			console.log(attempt);

			params.set('idUserRespones', `${attempt.idUserRespones}`);
			params.set('result', `${attempt.result}`);
			params.set('evaluationName', `${attempt.evaluationName}`);
			params.set('attempts', `${attempt.attempts}`);
			replace(`${pathname}/resultTest?${params.toString()}`);
		};
		clearStore();
	return (
		<AlertDialog defaultOpen={true}>
			<AlertDialogContent className='max-w-[1120px] max-h-[418px] !rounded-[20px]'>
				<AlertDialogHeader className='items-center'>
					<AlertDialogTitle className='text-[64px] font-semibold text-center'>
						{titleText}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter className='sm:justify-center justify-center gap-[80px] '>
					<AlertDialogAction
						className='bg-white text-black hover:bg-[#3F5FD7] hover:text-white hover:border-none w-[421px] h-[103px] border-[3px] border-black rounded-[15px] text-[40px] font-semibold'
						onClick={action === 'redirectToresult' ? redirectToResult : () => {}}
					>
						{actionText}
					</AlertDialogAction>
					<AlertDialogCancel onClick={cancel === 'reload' ? () => window.location.reload() : () => {}} className='bg-white text-black hover:bg-[#3F5FD7] hover:text-white hover:border-none w-[421px] h-[103px] border-[3px] border-black rounded-[15px] text-[40px] font-semibold'>
						{cancelText}
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
