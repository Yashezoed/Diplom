import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Dialog({
	title,
	cancelText,
	actionText,
	action,
	cancelAction
}: {
	title: string;
	cancelText: string;
	actionText: string;
	action: () => Promise<void>;
	cancelAction: () => Promise<void>;
}) {
	return (
		<AlertDialog defaultOpen={true}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelText}</AlertDialogCancel>
					<AlertDialogAction>{actionText}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
