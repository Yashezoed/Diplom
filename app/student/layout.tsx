export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-background p-[30px] h-[100vh]'>
			{children}
		</div>
	);
}
