import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlarmClock,
  FolderOpen,
  Check,
  TrendingUp,
  Funnel,
  Search,
} from "lucide-react"
import { PaginationProjects } from "../../components/PaginationProjects"
import { ProjectCard } from "../../components/ProjectCard"
import { PROJECTS_MOCK } from "../../mocks/projectsMock"
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 4

  const totalItems = PROJECTS_MOCK.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProjects = PROJECTS_MOCK.slice(startIndex, startIndex + itemsPerPage)
  const emptySlots = itemsPerPage - currentProjects.length

  const handlePageChange = (newPage) => {
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
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

  return (
    <div className="flex flex-col h-screen gap-4 overflow-hidden"> 
      <header className="h-[9vh] mt-10 flex justify-between items-center ">
        <div className='h-full'>
          <h1 className='text-white text-2xl font-bold tracking-tight truncate'>Projetos</h1>
          <p className="text-gray-300 text-sm tracking-tight truncate">Gerencie seus projetos e acompanhe o progresso</p>
        </div>
        <div>
          <Button variant="icon" >+</Button>
        </div>
      </header>

      <div className="flex justify-between h-[12%]">
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center ">
          <div className="bg-primaryPurple/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex ">
            <FolderOpen className="text-primaryPurple" size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">12</p>
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Total de Projetos</p>
          </div>
        </div>
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center">
          <div className="bg-primaryBlue/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex">
            <AlarmClock className="text-primaryBlue" size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">180h 25m</p>
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Tempo Total</p>
          </div>
        </div>
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center">
          <div className="bg-primaryOrange/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex">
            <TrendingUp className="text-primaryOrange" size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">240</p>
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Sessões</p>
          </div>
        </div>
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center">
          <div className="bg-primaryGreen/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex">
            <Check className="text-primaryGreen " size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">1</p>
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Concluidos</p>
          </div>
        </div>
      </div>

      <div className="flex h-[8%] border-white/15 rounded-lg border p-2 items-center justify-between gap-8">
        <div className="relative w-[40%]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Buscar Projetos..." 
            className="bg-primaryBackground border-white/15 text-white pl-10 focus-visible:ring-primaryPurple h-9" 
          />
        </div>
        <div className="w-[50%] flex gap-8">
          <Select>
            <SelectTrigger className="w-full bg-primaryBackground border-white/15 text-white truncate">
              <SelectValue placeholder="Selecione o Status" />
            </SelectTrigger>
            <SelectContent className="bg-primaryBackground border-white/15 text-white ">
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="concluido">Concluido</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full bg-primaryBackground border-white/15 text-white truncate">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent className="bg-primaryBackground border-white/15 text-white">
              <SelectItem value="todas">Todas as Prioridades</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="brancoBordas" className="flex-shrink-0 gap-2"><Funnel size={16}/> Limpar</Button>
      </div>

      <div className="h-[44%] w-full relative"> 
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid grid-cols-4 grid-rows-1 h-full gap-5 w-full absolute inset-0 content-start"
          >
            {currentProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
            
            {Array.from({ length: emptySlots }).map((_, index) => (
              <div key={`empty-${index}`} className="invisible" aria-hidden="true" />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-300 text-sm">Mostrando {currentProjects.length} de {totalItems} projetos</p>
        <div>
          <PaginationProjects 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}