import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 duration-200',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground border-2 border-primary hover:bg-white hover:text-black hover:border-black  border-[3px]',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border-2 border-black rounded-[39px] bg-white text-black  hover:bg-accent hover:text-accent-foreground  border-[3px]',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				linkBtn:
					'border-2 border-black bg-white hover:bg-accent rounded-[38px] flex items-center justify-between px-[40px]',
				answer: 'bg-white text-black border-2 border-black p-[20px]',
				nonActive:
					'bg-primary text-primary-foreground border-2 border-primary border-[3px]'
			},
			size: {
				default: 'text-[32px] py-[21px] font-semibold rounded-[18px]',
				medium: 'rounded-[39px] p-[16px] px-[30px] text-[25px] font-medium',
				sm: 'rounded-[15px] h-[47px] w-[330px] text-[24px]',
				lg: 'h-[148px] w-[485px] rounded-[39px] text-[40px]',
				xl: 'h-[120px] w-[687px] rounded-[39px] text-[40px]',
				icon: 'h-9 w-9',
				linkBtn: 'w-[447px] h-[85px] text-[36px]',
				profileBtn: 'w-[333px] h-[84px] rounded-[60px] text-[32px]'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
