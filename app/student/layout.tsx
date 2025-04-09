export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen bg-background flex flex-col '>
			<div className='mx-auto'>{children}</div>
		</div>
	);
}
