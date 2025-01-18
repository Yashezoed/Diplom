export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen bg-[linear-gradient(120deg,rgba(0,138,209,1)_0%,rgba(0,138,209,0.7)_100%)] flex flex-col'>
			<div className='w-[1200] max-h-[95vh] flex flex-col mx-auto bg-transparent'>
				{children}
			</div>

		</div>
	);
}
