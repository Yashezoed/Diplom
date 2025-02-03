
export default function Answers({
	text,
	index
}: {
	text: string,
	index: number
}) {
	// console.log(text);
	return (
		<button className='flex items-center h-[67px] bg-transparent rounded-2xl border-4 border-white] '>
			<span className='text-white text-[22px] font-medium mr-auto p-[20px] '>
				{`${index+1}. ${text}`}
			</span>
		</button>
	);
}
