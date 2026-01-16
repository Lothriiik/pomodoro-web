import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            "bg-primaryBackground text-white border border-white/20 shadow-xl",
          description: "text-white/70",
        },
      }}
    />
  )
}
