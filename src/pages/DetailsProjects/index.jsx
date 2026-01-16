import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { RadialProgress } from '../../components/RadialProgress';
import { ArrowLeft, BarChart3, History, Target, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const weeklyData = [
  { day: 'Seg', hours: 4 },
  { day: 'Ter', hours: 6 },
  { day: 'Qua', hours: 3 },
  { day: 'Qui', hours: 8 },
  { day: 'Sex', hours: 5 },
  { day: 'Sáb', hours: 2 },
  { day: 'Dom', hours: 0 },
];

const priorityStyles = {
  Baixa: { color: "text-[#86efac]", bg: "bg-[#86efac]" },
  Média: { color: "text-[#fef08a]", bg: "bg-[#fef08a]" },
  Alta: { color: "text-[#fca5a5]", bg: "bg-[#fca5a5]" },
  Urgente: { color: "text-[#9D8BFF]", bg: "bg-[#9D8BFF]" },
};

const currentPriority = "Alta";

export default function DetailsProjects() {
  const [view, setView] = useState("semanal")

  const projectDays = Array.from({ length: 120 }).map((_, i) => {
    const date = new Date();

    date.setDate(date.getDate() - (119 - i)); 

    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return {
      dayCounter: `Dia ${i + 1}`,
      date: formattedDate,
      hours: (Math.random() * 5).toFixed(1),
      intensity: Math.random()
    };
  });

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-col min-h-screen lg:overflow-hidden lg:h-screen gap-8 md:gap-4 justify-between">
        <header className="mt-8 sm:mt-10 flex items-center gap-4 md:pb-6">
          <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Button>
          <div className='h-full justify-center flex flex-col items-start'>
            <h1 className='text-white text-xl sm:text-2xl font-bold tracking-tight truncate'>Estudos React</h1>
            <h1 className="text-gray-400 text-xs sm:text-sm tracking-tight truncate">Curso Completo de React com projetos práticos</h1>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-6 px-4 md:px-0 min-h-0">
          <div className='flex flex-col md:flex-row w-full gap-4 md:h-[30%] shrink-0'>
            <div className='border-white/10 rounded-xl border p-5 w-full md:w-[70%] flex flex-col justify-between h-full'>
              <div>
                <p className="text-white font-medium truncate">Progresso Geral</p>
              </div>

              <div className=' grid grid-cols-2 mt-2 md:flex justify-between w-full items-center px-2 gap-2'>
    
                <div className='flex-1 flex flex-col items-start min-w-0'>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-base md:text-2xl tracking-tight">32</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                    <p className="text-xs md:text-sm tracking-tight font-medium">Sessões</p>
                  </div>
                </div>

                <div className='flex-1 flex flex-col items-start min-w-0 md:pl-6'>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-base md:text-2xl tracking-tight">13h 20m</p>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm  tracking-tight mt-1 font-medium pl-1">Tempo Total</p>
                </div>

                <div className='flex-1 flex flex-col items-start min-w-0 md:pl-6 relative group'>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-base md:text-2xl tracking-tight">32</p>
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-primaryPurple/50">
                    <p className="text-gray-400 text-xs md:text-sm  tracking-tight font-medium">Meta Sessões</p>
                    <Target className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>

                <div className='flex-1 flex flex-col items-start min-w-0 md:pl-6'>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-base md:text-2xl tracking-tight">13h 20m</p>
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-primaryPurple/50">
                    <p className="text-gray-400 text-xs md:text-sm tracking-tight font-medium">Meta Tempo</p>
                    <Target className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Progresso do Projeto</p>
                  <p className="text-white text-xs font-bold">75%</p>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primaryPurple rounded-full shadow-[0_0_10px_#9D8BFF44]" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
            <div className='border-white/10 rounded-xl border p-5 w-full md:w-[30%] flex flex-col h-full overflow-hidden'>
              <p className="text-white font-medium mb-2 shrink-0">Informações</p>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between  items-center w-full px-2">
                  <div className="flex flex-col items-start min-w-0">
                    <p className="text-gray-400 text-[clamp(0.6rem,0.7vw,0.7rem)] tracking-widest mt-0.5">
                      Prazo
                    </p>
                    <p className="text-white font-bold text-[clamp(0.9rem,1.1vw,1.0rem)] tracking-tight ">
                      14/07/2024
                    </p>
                  </div>

                  <div className="flex flex-col items-start min-w-0">
                    <p className="text-gray-500 text-[clamp(0.6rem,0.7vw,0.7rem)] tracking-widest ">
                      Status
                    </p>
                    <span className="px-4 py-1 mt-1 bg-primaryPurple/10 text-primaryPurple text-[11px] font-bold rounded-full border border-primaryPurple/20 uppercase mb-1">
                      Em andamento
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start w-full px-2">
                  <p className="text-gray-400 text-[clamp(0.6rem,0.7vw,0.7rem)] tracking-widest mt-0.5">
                      Prioridade
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full", 
                        priorityStyles[currentPriority].bg,
                        "shadow-[0_0_8px_currentColor]",
                        priorityStyles[currentPriority].color
                      )} />
                      <p className={cn(
                        "font-bold text-[clamp(0.9rem,1.1vw,1.0rem)] tracking-tight",
                        priorityStyles[currentPriority].color
                      )}>
                        {currentPriority}
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-4 md:h-[60%] min-h-0">
            <div className='border-white/10 rounded-xl border p-5 w-full md:w-[70%] flex flex-col h-[350px] md:h-full  '>
              <div className='flex items-center justify-between mb-6'>
                <p className="text-white font-medium">Atividade do Projeto</p>
                
                <div className="flex p-1 rounded-lg border border-white/5">
                  <button 
                    onClick={() => setView("semanal")}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      view === "semanal" ? "bg-primaryPurple " : "text-gray-400 hover:text-white"
                    )}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Semanal
                  </button>
                  <button 
                    onClick={() => setView("total")}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                      view === "total" ? "bg-primaryPurple" : "text-gray-400 hover:text-white"
                    )}
                  >
                    <History className="w-3.5 h-3.5" />
                    Total 
                  </button>
                </div>
              </div>

              <div className="flex-1 min-h-0 w-full border border-dashed border-white/5 rounded-lg overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {view === "semanal" ? (
                    <motion.div
                      key="semanal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                          <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#71717a', fontSize: 10}}
                          tickFormatter={(value) => `${value}h`} 
                          width={40}
                        />
                          <RechartsTooltip 
                            cursor={{fill: '#ffffff05'}} 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-primaryBackground border border-white/10 p-2 rounded-lg shadow-xl">
                                    <p className="text-white text-xs font-bold">{`${payload[0].value} horas`}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar 
                            dataKey="hours" 
                            fill="#9D8BFF" 
                            radius={[4, 4, 0, 0]} 
                            barSize={30}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="total"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full overflow-y-auto custom-scrollbar p-4"
                    >
                      <div className="flex flex-wrap gap-2 content-start">
                        {projectDays.map((day, i) => (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <div 
                                className={cn(
                                  "rounded-[2px] transition-all hover:scale-110 cursor-pointer",
                                  "w-[clamp(12px,1.15vw,20px)] h-[clamp(12px,1.15vw,20px)]",
                                  day.intensity > 0.3 ? "bg-primaryPurple" : "bg-white/5"
                                )}
                                style={{ opacity: day.intensity > 0.3 ? day.intensity : 1 }}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-primaryBackground border border-white/10 text-white">
                              <p className="text-xs font-bold">{day.date}</p>
                              <p className="text-[10px] text-gray-300">{day.dayCounter}</p>
                              <p className="text-[10px] text-primaryPurple">{day.hours}h de foco</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className=' border-white/10 rounded-xl border p-5 w-full mb-8 md:w-[30%] flex flex-col h-full overflow-hidden'>
              <div className="flex items-center justify-between mb-6 shrink-0">
                <p className="text-white font-medium">Tarefas</p>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  9/12 concluídas
                </span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {[
                  { id: 1, title: "Análise de requisitos", time: "2h 30m", completed: true },
                  { id: 2, title: "Wireframes principais", time: "2h 30m", completed: true },
                  { id: 3, title: "Design system", time: "2h 30m", completed: false },
                  { id: 4, title: "Protótipo Interativo", time: "2h 30m", completed: false },
                  { id: 5, title: "Testes de usabilidade", time: "2h 30m", completed: false },
                ].map((task) => (
                  <div
                    key={task.id}
                    className=" h-12 tracking-tight truncate w-full shrink-0 group flex items-center justify-between p-3 bg-primaryBackground border border-white/5 rounded-xl hover:border-primaryPurple/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                          task.completed
                            ? "bg-primaryGreen/40 border-primaryGreen text-primaryGreen"
                            : "border-white/10 bg-transparent text-transparent"
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-[clamp(0.8rem,0.9vw,0.875rem)] font-medium transition-all",
                            task.completed ? "text-gray-500 " : "text-white"
                          )}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] text-gray-600 font-medium">
                          {task.time}
                        </span>
                      </div>
                    </div>

                    <button className="text-gray-700 hover:text-white transition-colors px-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}