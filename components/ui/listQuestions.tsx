export default function ListQuestions({
	length,
	onChangeQuestion
}: {
	length: number;
	onChangeQuestion: (to: number) => void;
}) {
	return (
		<div className='bg-white/20 rounded-xl mt-[16px] w-[280px]'>
			<div className='p-[20px] flex flex-wrap'>
				{(() => {
					const arr = [];
					for (let i = 0; i < length; i++) {
						arr.push(
							<button
								key={i}
								onClick={() => {
									onChangeQuestion(i);
								}}
								className='text-[#008AD1]/50 bg-white/60 m-[5px] size-[30px] rounded-sm'
							>
								{i + 1}
							</button>
						);
					}
					return arr;
				})()}
			</div>
		</div>
	);
}
