import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
		<div
			className={cn('animate-pulse rounded-xl bg-[#D9D9D9]', className)}
			{...props}
		/>
  );
}

export { Skeleton }
