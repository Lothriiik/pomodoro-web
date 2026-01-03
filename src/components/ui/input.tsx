import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  hasError?: boolean
}

function Input({ className, hasError, ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={hasError}
      className={cn(
        "file:text-foreground placeholder:text-white/50 selection:bg-primary selection:text-primary-foreground dark:bg-primaryBackgroundinput/20 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-md",
        "focus-visible:border-ring focus-visible:ring-ring/50 ",
        hasError ? "ring-2 ring-red-500 border-red-500" : "ring-0 border-white/20",
        className
      )}
    />
  )
}


export { Input }
