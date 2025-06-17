"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityCalendarProps {
  data?: { date: string; count: number }[];
}

const colorLevels = [
  { colorClass: "bg-neutral-800", label: "0 contribuições" },
  { colorClass: "bg-purple-600/20", label: "1 a 4 contribuições" },
  { colorClass: "bg-purple-600/40", label: "5 a 9 contribuições" },
  { colorClass: "bg-purple-600/60", label: "10 a 14 contribuições" },
  { colorClass: "bg-purple-600/80", label: "15 a 19 contribuições" },
  { colorClass: "bg-purple-600", label: "20 ou mais contribuições" },
];

const getFillColor = (count: number) => {
  if (count === 0) return colorLevels[0].colorClass;
  if (count < 5) return colorLevels[1].colorClass;
  if (count < 10) return colorLevels[2].colorClass;
  if (count < 15) return colorLevels[3].colorClass;
  if (count < 20) return colorLevels[4].colorClass;
  return colorLevels[5].colorClass;
};

const CELL_SIZE = 16; // quadradinho w-4 h-4 = 16px
const CELL_GAP = 3; // gap menor para combinar

const parseDateLocal = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function ActivityCalendar() {
  const currentYearActual = new Date().getFullYear();
  const availableYears = useMemo(() => {
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYearActual - i);
    }
    return years.sort((a, b) => b - a);
  }, [currentYearActual]);

  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  const daysInWeek = 7;
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const { calendarGrid, totalDaysInPeriod, totalCommits } = useMemo(() => {
    const yearStart = new Date(selectedYear, 0, 1);
    yearStart.setHours(0, 0, 0, 0);

    const yearEnd = new Date(selectedYear, 11, 31);
    yearEnd.setHours(23, 59, 59, 999);

    // Começa no domingo anterior a 1º de jan
    const startDate = new Date(yearStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // Termina no sábado posterior ao 31 de dez
    const endDate = new Date(yearEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days: ({ date: string; count: number } | null)[] = [];
    const realDays: { date: string; count: number }[] = [];

    let current = new Date(startDate);
    while (current <= endDate) {
      const isoDate = current.toISOString().split("T")[0];
      const count = Math.floor(Math.random() * 25);

      const inYear = current >= yearStart && current <= yearEnd;
      const item = inYear ? { date: isoDate, count } : null;

      days.push(item);
      if (inYear && item) realDays.push(item);

      current.setDate(current.getDate() + 1);
    }

    const totalCommits = realDays.reduce((acc, day) => acc + day.count, 0);

    // Monta grid: cada coluna = uma semana (7 dias)
    const grid: ({ date: string; count: number } | null)[][] = [];
    for (let i = 0; i < days.length; i += daysInWeek) {
      grid.push(days.slice(i, i + daysInWeek));
    }

    return {
      calendarGrid: grid,
      totalDaysInPeriod: realDays.length,
      totalCommits,
    };
  }, [selectedYear]);

  return (
    <TooltipProvider>
      <div className="flex flex-col p-2 rounded-md text-white max-w-full select-none">
        <div className="flex justify-between mb-4 items-center flex-wrap gap-2">
          <p className="text-sm text-neutral-100 font-semibold">
            {totalCommits} de commits em {selectedYear}
          </p>
          <Select
            value={String(selectedYear)}
            onValueChange={(val) => setSelectedYear(Number(val))}

          >
            <SelectTrigger>
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ano</SelectLabel>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex" style={{ minWidth: 0 }}>
          {/* Nomes dos dias fixos */}
          <div className="flex flex-col gap-[3px] text-xs text-neutral-400 min-w-[36px] pr-1">
            {dayNames.map((day, index) => (
              <div
                key={day}
                className="h-[16px] flex items-center justify-start whitespace-nowrap select-none"
              >
                {index === 0 || index === 2 || index === 4 || index === 6
                  ? day
                  : ""}
              </div>
            ))}
          </div>

          {/* Meses em cima + quadradinhos */}
          <div
            className="overflow-x-auto w-full"
            style={{ minWidth: 0, maxWidth: "100%" }}
          >
            <div
              className="flex flex-col gap-[3px] pr-2"
              style={{
                minWidth: calendarGrid.length * (CELL_SIZE + CELL_GAP),
              }}
            >
              {/* Linha dos meses */}
              <div className="flex gap-[3px] pl-[22px] text-xs text-neutral-400 select-none h-[14px]">
                {calendarGrid.map((week, weekIndex) => {
                  const firstDay = week.find((day) => day !== null);
                  if (!firstDay) return <div key={weekIndex} className="w-[19px]" />;

                  const month = parseDateLocal(firstDay.date).getMonth();

                  const prevWeekFirstDay =
                    weekIndex > 0
                      ? calendarGrid[weekIndex - 1].find((d) => d !== null)
                      : null;
                  const prevMonth = prevWeekFirstDay
                    ? parseDateLocal(prevWeekFirstDay.date).getMonth()
                    : -1;

                  if (month !== prevMonth) {
                    return (
                      <div
                        key={weekIndex}
                        className="w-[16px] font-semibold"
                        style={{ minWidth: CELL_SIZE, marginLeft: -3 }}
                        title={monthNames[month]}
                      >
                        {monthNames[month]}
                      </div>
                    );
                  }
                  return <div key={weekIndex} className="w-[16px]" />;
                })}
              </div>

              {/* Quadradinhos */}
              <div className="flex gap-[3px]">
                {calendarGrid.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={`${weekIndex}-${dayIndex}`}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "w-4 h-4 rounded-sm transition-colors duration-200 cursor-pointer flex-shrink-0",
                              day ? getFillColor(day.count) : "bg-neutral-900"
                            )}
                            style={{ pointerEvents: day ? "auto" : "none" }}
                            title={day?.date}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {day ? (
                              <>
                                <strong>{day.count} contribuições</strong> em{" "}
                                {parseDateLocal(day.date).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </>
                            ) : (
                              "Nenhuma contribuição"
                            )}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex justify-end items-center gap-3 mt-4 text-xs text-neutral-400 select-none flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help font-semibold text-neutral-100">
                Menos
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>0 contribuições</p>
            </TooltipContent>
          </Tooltip>

          {colorLevels.map(({ colorClass, label }, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn("w-4 h-4 rounded-sm cursor-default", colorClass)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help font-semibold text-neutral-100">
                Mais
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>20 ou mais contribuições</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
