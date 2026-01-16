"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export function PaginationWeeklyPlanner({ weekOffset, onChange }) {
  const weekLabels = [
    { offset: -2, label: "2 Semanas Atrás" },
    { offset: -1, label: "Semana Passada" },
    { offset: 0, label: "Esta Semana" },
    { offset: 1, label: "Próxima Semana" },
    { offset: 2, label: "Daqui a 2 Semanas" },
  ]

  const currentLabel = weekLabels.find(w => w.offset === weekOffset)?.label

  return (
    <Pagination className="text-white select-none">
      <PaginationContent className="gap-4">
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => weekOffset > -2 && onChange(weekOffset - 1)}
            className={cn(
              "cursor-pointer hover:bg-zinc-800 [&_span]:hidden h-10 w-10 p-0",
              weekOffset === -2 && "pointer-events-none opacity-20"
            )}
          />
        </PaginationItem>

        <PaginationItem className="min-w-[150px] text-center text-sm md:text-base font-medium">
          {currentLabel}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext 
            onClick={() => weekOffset < 2 && onChange(weekOffset + 1)}
            className={cn(
              "cursor-pointer hover:bg-zinc-800 [&_span]:hidden h-10 w-10 p-0",
              weekOffset === 2 && "pointer-events-none opacity-20"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}