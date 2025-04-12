import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

export default function Dialog({
	title,
	cancelText,
	actionText,
	ActionHref,
	cancelHref
}: {
	title: React.ReactNode;
	cancelText?: string;
	actionText: string;
	cancelHref?: string;
	ActionHref: string;
	IdResult?: number;
}) {
	return (
		<AlertDialog defaultOpen={true}>
			<AlertDialogContent className='max-w-[1200px] !rounded-[20px] bg-white'>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-[58px] font-semibold text-center'>
						{title}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex !justify-evenly'>
					{cancelText && cancelHref && (
						<Link href={cancelHref}>
							<AlertDialogCancel className=''>
								{cancelText}
							</AlertDialogCancel>
						</Link>
					)}
					<Link href={ActionHref}>
						<AlertDialogAction>{actionText}</AlertDialogAction>
					</Link>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
