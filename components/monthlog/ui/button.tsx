import { cn } from '@/lib/utils'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-2',
        ghost: '',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 py-2.5 px-3 rounded-2xl text-base',
        sm: 'h-9 px-3 py-2 rounded-lg text-sm',
        lg: 'h-14 px-6 py-4 rounded-2xl text-lg',
        xl: 'h-16 px-8 py-4 rounded-2xl text-xl font-bold',
        icon: 'size-11 rounded-2xl',
      },
      color: {
        primary: '',
        grayscale: '',
        neutral: '',
        destructive: '',
      },
    },
    compoundVariants: [
      // Default variant colors
      {
        variant: 'default',
        color: 'primary',
        className: 'bg-blue-500 text-white hover:bg-blue-600',
      },
      {
        variant: 'default',
        color: 'grayscale',
        className: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      },
      {
        variant: 'default',
        color: 'neutral',
        className: 'bg-gray-800 text-white hover:bg-gray-900',
      },
      {
        variant: 'default',
        color: 'destructive',
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      // Outline variant colors
      {
        variant: 'outline',
        color: 'primary',
        className: 'border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600',
      },
      {
        variant: 'outline',
        color: 'grayscale',
        className: 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
      },
      {
        variant: 'outline',
        color: 'neutral',
        className: 'border-gray-800 text-gray-800 hover:bg-gray-100 hover:border-gray-900',
      },
      {
        variant: 'outline',
        color: 'destructive',
        className: 'border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600',
      },
      // Ghost variant colors
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-blue-500 hover:bg-blue-50',
      },
      {
        variant: 'ghost',
        color: 'grayscale',
        className: 'text-gray-700 hover:bg-gray-100',
      },
      {
        variant: 'ghost',
        color: 'neutral',
        className: 'text-gray-800 hover:bg-gray-100',
      },
      {
        variant: 'ghost',
        color: 'destructive',
        className: 'text-red-500 hover:bg-red-50',
      },
      // Link variant colors
      {
        variant: 'link',
        color: 'primary',
        className: 'text-blue-500 hover:text-blue-600',
      },
      {
        variant: 'link',
        color: 'grayscale',
        className: 'text-gray-700 hover:text-gray-800',
      },
      {
        variant: 'link',
        color: 'neutral',
        className: 'text-gray-800 hover:text-gray-900',
      },
      {
        variant: 'link',
        color: 'destructive',
        className: 'text-red-500 hover:text-red-600',
      },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'primary',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  color,
  size,
  asChild = false,
  icon,
  loading = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: React.ReactElement<SVGElement>
    loading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  const displayIcon = loading ? (
    <Loader2Icon className="size-4 animate-spin" />
  ) : icon ? (
    <icon.type className={cn('size-4', icon.props.className)} />
  ) : null

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, color, size, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      <span className={cn({ hidden: !displayIcon })}>{displayIcon}</span>
      <Slottable>{children}</Slottable>
    </Comp>
  )
}

export { Button, buttonVariants }