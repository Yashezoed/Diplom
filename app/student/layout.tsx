export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-background py-[50px] px-[85px] h-[100vh]'>
			{children}
		</div>
	);
}
