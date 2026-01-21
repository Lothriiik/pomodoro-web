import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-gray-default",
        link: "text-primary underline-offset-4 hover:underline",
        roxo: "bg-primaryPurple hover:bg-primaryPurpleHover text-primaryBackground font-semibold",
        letraAzul: "bg-transparent hover:bg-primaryBlue hover:text-primaryBackground text-primaryBlue font-semibold",
        letraCinza: "bg-transparent hover:text-white text-gray-default font-semibold",
        cancelar: "bg-transparent hover:text-primaryRed hover:border-primaryRed text-gray-default border-gray-default border font-semibold",
        azul: "bg-primaryBlue hover:bg-primaryBlueHover text-primaryBackground font-semibold",
        verde: "bg-primaryGreen hover:bg-primaryGreenHover text-primaryBackground font-semibold",
        rosa: "bg-primaryPink hover:bg-primaryPinkHover text-primaryBackground font-semibold",
        laranja: "bg-primaryOrange hover:bg-primaryOrangeHover text-primaryBackground font-semibold",
        vermelho: "bg-primaryRed hover:bg-primaryRedHover text-primaryBackground font-semibold",
        amarelo: "bg-primaryYellow hover:bg-primaryellowHover text-primaryBackground font-semibold",
        cinza: "bg-transparent hover:bg-primaryPurple hover:text-primaryBackground text-gray-default font-semibold",
        brancoBordas: "bg-transparent hover:border-primaryPurple hover:text-primaryPurple text-gray-default border-white/15 border",
        calendarycolor: "bg-transparent hover:bg-primaryPurple hover:text-primaryBackground text-gray-default focus:bg-primaryPurple focus:text-primaryBackground",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        fixedsm: "h-8 w-[70px] rounded-md text-xs md:text-sm",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        padrao: "h-10 rounded-md px-4 md:px-10 has-[>svg]:px-4 md:w-[120px] w-full max-w-[100px] text-xs md:text-sm",
        xg: "h-10 md:w-[140px] w-full  md:max-w-[120px] max-w-[95px] text-xs md:text-sm rounded-md",
        full: "h-10 w-full rounded-md",
        add: "size-8 rounded-full",
        icon: 'size-8',
        iconbutton: "size-10 rounded-full",
        mobile: "h-9 md:w-[140px] w-[48%] md:max-w-[120px] text-xs md:text-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const hoverClasses: Record<string, string> = {
  roxo: "hover:bg-primaryPurple hover:text-primaryBackground",
  azul: "hover:bg-primaryBlue hover:text-primaryBackground",
  verde: "hover:bg-primaryGreen hover:text-primaryBackground",
  laranja: "hover:bg-primaryOrange hover:text-primaryBackground",
  amarelo: "hover:bg-primaryYellow hover:text-primaryBackground",
  rosa: "hover:bg-primaryPink hover:text-primaryBackground",
};


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  children,
  disabled,
  activeColor,
  ...props
}: ButtonProps & { activeColor?: string }) {
  const Comp = asChild ? Slot : "button"
  const colorClass = activeColor ? hoverClasses[activeColor] : "";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), colorClass)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin size-4" />}
      {isLoading ? "Processando..." : children}
    </Comp>
  )
}

export { Button, buttonVariants }
