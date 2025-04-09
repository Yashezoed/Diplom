import * as React from 'react';

import { cn } from '@/lib/utils';
import { Asterisk } from 'lucide-react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, about, ...props }, ref) => {
		return (
			<div className=''>
				<label className='flex items-center text-[32px] mb-[10px]'>
					<Asterisk size={32} color='#ff0000' strokeWidth={1.5} />
					{about}
				</label>
				<input
					type={type}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
