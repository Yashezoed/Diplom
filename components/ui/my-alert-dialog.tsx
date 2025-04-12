import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog';

export default function MyAlertDialog({
	triggerText,
	titleText,
	action,
	actionText,
	cancelText
}: {
	triggerText?: string;
	titleText: string;
	action: () => Promise<void>;
	actionText: string;
	cancelText: string;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='bg-[#3F5FD7] text-white rounded-[35px] p-[16px] px-[30px] text-[25px] font-medium hover:bg-white hover:text-black/90 duration-200 border-[#3F5FD7] border-[3px] hover:border-black'>
				{triggerText}
			</AlertDialogTrigger>
			<AlertDialogContent className='max-w-[1120px] max-h-[418px] !rounded-[20px] bg-white'>
				<AlertDialogHeader className='items-center'>
					<AlertDialogTitle className='text-[64px] font-semibold '>
						{titleText}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter className='sm:justify-center justify-center gap-[80px] '>
					<AlertDialogAction
						className='bg-white text-black hover:bg-[#3F5FD7] hover:text-white hover:border-none w-[421px] h-[103px] border-[3px] border-black rounded-[15px] text-[40px] font-semibold'
						onClick={action}
					>
						{actionText}
					</AlertDialogAction>
					<AlertDialogCancel className='bg-white text-black hover:bg-[#3F5FD7] hover:text-white hover:border-none w-[421px] h-[103px] border-[3px] border-black rounded-[15px] text-[40px] font-semibold'>
						{cancelText}
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
