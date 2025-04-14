import { ExitButton } from "@/components/ui/exit";

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-white my-10 rounded-[65px] w-[1750px] h-[875px]'>
			<header className='flex justify-between items-center min-h-[75px] pl-[65px] pr-[95px] pt-[80px] '>
				<h1 className="text-[60px] font-semibold text-black">Ваш профиль</h1>
				<ExitButton />

			</header>
			<main className='px-[70px] pt-[65px]'>{children}</main>
		</div>
	);
}
