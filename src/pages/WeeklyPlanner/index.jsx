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
  const [isMobile, setIsMobile] = useState(false);
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
    const checkScreen = () => {

      const heightQuery = window.matchMedia("(max-height: 760px)");
      setIsSmallScreen(heightQuery.matches);

      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
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
    <div className="flex flex-col min-h-screen lg:overflow-hidden lg:h-screen gap-6 md:gap-6 justify-between ">
      <header className="mt-8 sm:mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto self-start">
          <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight truncate">
            Planejamento Semanal
          </h1>
          <div className="text-gray-300 text-xs sm:text-sm tracking-tight truncate">
            Gerencie seus projetos e acompanhe o progresso
          </div>
        </div>

        <div className="flex-shrink-0">
          <PaginationWeeklyPlanner 
            weekOffset={weekOffset} 
            onChange={handleWeekChange} 
          />
        </div>
      </header>
      
      <div className="relative w-full h-auto lg:h-[50vh] min-h-[40vh] shrink-0">
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
            className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-[clamp(1rem,2.5vw,3rem)] w-full lg:absolute lg:inset-0 "
          >
            {weekDays.map((day) => {
              const isSelected = selectedDay === day.key;
              const activities = MOCK_DATA[`${weekOffset}-${day.key}`] || [];
              return (
                <div 
                  key={day.key} 
                  onClick={() => setSelectedDay(day.key)}
                  className={`relative flex flex-row md:flex-col border rounded-lg p-2 items-center w-full h-33 md:h-auto cursor-pointer transition-all ${
                    isSelected 
                      ? "border-primaryPurple ring-1 ring-primaryPurple/20" 
                      : "border-white/15 hover:border-white/30"
                  }`}
                >
                  <div className='h-[10vh] flex flex-col justify-center items-center  w-32 md:w-full'>
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
                  <div className="activities-list overflow-y-auto w-full flex flex-row md:flex-col items-center gap-4 md:gap-2 md:mb-4">
                    {activities.length > cardLimit ? (
                      <>
                        {activities.slice(0, cardLimit).map((act) => {
                          return isMobile ? (
                            <ActivityCard key={act.id} {...act} />
                          ) : (
                            <ActivityCardReduced key={act.id} {...act} />
                          );
                        })}
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="h-25 md:h-15 w-26 md:w-[clamp(6.25rem,8vw,8rem)] py-2 border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer shrink-0">
                              <span className="text-white font-bold text-sm">
                                {activities.length - cardLimit}+
                              </span>
                              <span className="text-gray-400 text-[10px] uppercase">mais</span>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent 
                            side="right"           
                            align="bottom"
                            className="w-40 p-6 md:p-4 bg-primaryBackground border-white/20 shadow-2xl flex flex-col gap-3"
                          >
                            {activities.slice(cardLimit).map((act) => (
                              <ActivityCard key={act.id} {...act} />
                            ))}
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
      <div className='flex flex-col md:flex-row w-full  justify-between flex-shrink-0 gap-4 mb-12'>
        <div className="h-full w-full md:w-[44vw] border-white/10 rounded-xl border p-5 flex">
          <div className='w-[75%] flex flex-col gap-2'>
            <p className="text-white font-medium mb- shrink-0">Resumo - {weekDays.find(d => d.key === selectedDay)?.label} {weekDays.find(d => d.key === selectedDay)?.displayDate}</p>
            <div className='flex justify-between gap-6 tracking-tight truncate w-full items-start px-2'>
              <div className='flex-1 flex flex-col items-start min-w-0'>
                <p className="text-white font-bold text-base md:text-2xl tracking-tight">20h 20m</p>
                <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                  <p className="text-xs md:text-sm  tracking-tight ">Tempo Focado</p>
                </div>
              </div>
              <div className='flex-1 flex flex-col items-start min-w-0 pl-6'>
                <div className="flex items-center gap-1">
                  <p className="text-white font-bold text-base md:text-2xl tracking-tight">5 / 20</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1 ">
                  <p className="text-gray-400 text-xs md:text-sm  tracking-tight font-medium">Concluídas</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center w-[25%] shrink-0 tracking-wider truncate '>
            <RadialProgress value={50} size={70} stroke={6} />
          </div>
        </div>

        <div className="h-full w-full md:w-[44vw] border-white/10 rounded-xl border p-5 flex">
          <div className='w-[75%] flex flex-col gap-2'>
            <p className="text-white font-medium truncate">Resumo da Semana</p>
            <div className='flex justify-between gap-6 items-start px-2 tracking-tight truncate w-full'>
              <div className='flex-1 flex flex-col items-start min-w-0'>
                <p className="text-white font-bold text-base md:text-2xl">20h 20m</p>
                <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                  <p className="text-xs md:text-sm  tracking-tight font-medium">Tempo Focado</p>
                </div>
              </div>
              <div className='flex-1 flex flex-col items-start min-w-0 pl-6'>
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-base md:text-2xl tracking-tight truncate">5 / 20</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-primaryPurple/50">
                  <p className="text-gray-400 text-xs md:text-sm tracking-tight font-medium tracking-wider truncate">Atividades</p>
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