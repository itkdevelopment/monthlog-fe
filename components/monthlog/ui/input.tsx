import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200 outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
