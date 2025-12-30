import { useState, useEffect } from 'react';
import { ActivityCard, ActivityCardReduced } from '../../components/ActivityCard';
import { PaginationWeeklyPlanner } from '../../components/PaginationWeeklyPlanner';
import { MOCK_DATA } from '../../mocks/mockData'; 
import { RadialProgress } from '../../components/RadialProgress';
import { ModalAddActivity } from '../../components/ModalAddActivity';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function WeeklyPlanner() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [direction, setDirection] = useState(0);


  const handleWeekChange = (newOffset) => {
    setDirection(newOffset > weekOffset ? 1 : -1);
    setWeekOffset(newOffset);
  };
  
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-height: 760px)");
    setIsSmallScreen(mediaQuery.matches);
    const handler = (e) => setIsSmallScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const cardLimit = isSmallScreen ? 1 : 2;

  const getWeekDays = (offset) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
    const labels = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    const fullLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    return labels.map((key, i) => {
      const date = new Date();
      date.setDate(now.getDate() + diffToMonday + (offset * 7) + i);
      
      return {
        key: key,
        label: fullLabels[i],
        displayDate: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                         .replace(' de ', ' ') 
                         .replace('.', ''),
        isToday: date.toDateString() === new Date().toDateString()
      };
    });
  };

  const weekDays = getWeekDays(weekOffset);
  const todayKey = weekDays.find(d => d.isToday)?.key || "seg";
  const [selectedDay, setSelectedDay] = useState(todayKey);

  return (
    <div className="flex flex-col h-screen gap-6 overflow-hidden">
      <header className="h-[10vh] mt-10 flex justify-between items-center shrink-0">
        <div className='h-full'>
          <h1 className='text-white text-2xl font-bold tracking-tight truncate'>Planejamento Semanal</h1>
          <div className="text-gray-300 text-sm tracking-tight truncate">Gerencie seus projetos e acompanhe o progresso</div>
        </div>
        <div>
          <PaginationWeeklyPlanner 
            weekOffset={weekOffset} 
            onChange={handleWeekChange} 
          />
        </div>
      </header>
      <div className="relative w-full h-[50vh] min-h-[50vh]  shrink-0">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div 
            key={weekOffset} 
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.2 }
            }}
            className="grid grid-cols-7 grid-rows-1 h-full gap-[clamp(1.0rem,2.5vw,3rem)] w-full absolute inset-0 content-start pl-2 pr-2"
          >
            {weekDays.map((day) => {
              const isSelected = selectedDay === day.key;
              const activities = MOCK_DATA[`${weekOffset}-${day.key}`] || [];
              return (
                <div 
                  key={day.key} 
                  onClick={() => setSelectedDay(day.key)}
                  className={`relative flex flex-col border rounded-lg p-2 items-center w-full h-auto cursor-pointer transition-all ${
                    isSelected 
                      ? "border-primaryPurple ring-1 ring-primaryPurple/20" 
                      : "border-white/15 hover:border-white/30"
                  }`}
                >
                  <div className='h-[10vh] flex flex-col justify-center items-center w-full'>
                    <h3 className={`text-sm ${isSelected ? "text-primaryPurple" : "text-gray-400"}`}>
                      {day.label}
                    </h3>
                    <h1 className={`text-md ${isSelected ? "text-primaryPurple font-bold" : "text-white"}`}>
                      {day.displayDate}
                    </h1>
                    <div className="h-2 mt-1 flex items-center justify-center">
                      {day.isToday && <div className="w-1.5 h-1.5 bg-primaryPurple rounded-full"></div>}
                    </div>
                  </div>
                  <div className="activities-list overflow-y-auto w-full flex flex-col items-center gap-2 mb-4">
                    {activities.length > cardLimit ? (
                      <>
                        {activities.slice(0, cardLimit).map((act) => (
                          <ActivityCardReduced key={act.id} {...act} />
                        ))}
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="h-15 w-[clamp(6.25rem,8vw,8rem)] py-2 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer shrink-0">
                              <span className="text-white font-bold text-sm">
                                {activities.length - cardLimit}+
                              </span>
                              <span className="text-gray-400 text-[10px] uppercase">mais</span>
                            </div>
                          </PopoverTrigger>
                          
                          <PopoverContent 
                            side="right"           
                            align="bottom"
                            className="w-41 p-2 bg-primaryBackground border-white/20 p-2 shadow-2xl"
                          >
                            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1 px-1">Restante do dia</p>
                              {activities.slice(cardLimit).map((act) => (
                                <ActivityCard key={act.id} {...act} />
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </>
                    ) : (
                      activities.map((act) => (
                        <ActivityCard key={act.id} {...act} />
                      ))
                    )}
                  </div>
                  {isSelected && (
                    <ModalAddActivity day={`${day.label} ${day.displayDate}`} />
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className='flex flex-row w-full h-[20vh] justify-between shrink-0 '>
        <div className="h-full w-[44vw] border-white/10 rounded-xl border p-5 flex">
          <div className='w-[75%] flex flex-col gap-2'>
            <p className="text-white font-medium mb- shrink-0">Resumo - {weekDays.find(d => d.key === selectedDay)?.label} {weekDays.find(d => d.key === selectedDay)?.displayDate}</p>
            <div className='flex justify-between gap-6 tracking-tight truncate w-full items-start px-2'>
              <div className='flex-1 flex flex-col items-start min-w-0'>
                <p className="text-white font-bold text-[clamp(1.2rem,1.5vw,1.75rem)] tracking-tight">20h 20m</p>
                <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                  <p className="text-[clamp(0.7rem,0.9vw,0.875rem)] tracking-tight ">Tempo Focado</p>
                </div>
              </div>
              <div className='flex-1 flex flex-col items-start min-w-0 pl-6'>
                <div className="flex items-center gap-1">
                  <p className="text-white font-bold text-[clamp(1.2rem,1.5vw,1.75rem)] tracking-tight">5 / 20</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1 ">
                  <p className="text-gray-400 text-[clamp(0.7rem,0.9vw,0.875rem)] tracking-tight font-medium">Concluídas</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center w-[25%] shrink-0 tracking-wider truncate '>
            <RadialProgress value={50} size={70} stroke={6} />
          </div>
        </div>

        <div className="h-full w-[44vw] border-white/10 rounded-xl border p-5 flex">
          <div className='w-[75%] flex flex-col gap-2'>
            <p className="text-white font-medium truncate">Resumo da Semana</p>
            <div className='flex justify-between gap-6 items-start px-2 tracking-tight truncate w-full'>
              <div className='flex-1 flex flex-col items-start min-w-0'>
                <p className="text-white font-bold text-[clamp(1.2rem,1.5vw,1.75rem)] ">20h 20m</p>
                <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                  <p className="text-[clamp(0.7rem,0.9vw,0.875rem)] tracking-tight font-medium">Tempo Focado</p>
                </div>
              </div>
              <div className='flex-1 flex flex-col items-start min-w-0 pl-6'>
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-[clamp(1.2rem,1.5vw,1.75rem)] tracking-tight tracking-wider truncate">5 / 20</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-primaryPurple/50">
                  <p className="text-gray-400 text-[clamp(0.7rem,0.9vw,0.875rem)] tracking-tight font-medium tracking-wider truncate">Atividades</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center w-[25%] shrink-0 tracking-wider truncate'>
            <RadialProgress value={80} size={70} stroke={6} />
          </div>
        </div>
      </div>
    </div>
  );
}