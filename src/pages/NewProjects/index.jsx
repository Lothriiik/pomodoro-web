import { useState, useEffect } from 'react';
import { ActivityCard, ActivityCardReduced } from '../../components/ActivityCard';
import { PaginationWeeklyPlanner } from '../../components/PaginationWeeklyPlanner';
import { MOCK_DATA } from '../../mocks/mockData'; 
import { RadialProgress } from '../../components/RadialProgress';
import { ModalAddActivity } from '../../components/ModalAddActivity';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function NewProjects() {
  

  return (
    <div className="flex flex-col h-screen gap-6">
      <header className="h-[10vh] mt-10 flex justify-between items-center ">
        <div className='h-full'>
          <h1 className='text-white text-2xl font-bold tracking-tight truncate'>Planejamento Semanal</h1>
          <div className="text-gray-300 text-sm tracking-tight truncate">Gerencie seus projetos e acompanhe o progresso</div>
        </div>
      </header>
      <div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}