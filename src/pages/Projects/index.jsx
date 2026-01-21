import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
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
  Plus
} from "lucide-react"
import { PaginationProjects } from "../../components/features/Projects/PaginationProjects"
import { ProjectCard } from "../../components/features/Projects/ProjectCard"
import { PROJECTS_MOCK } from "../../mocks/projectsMock"
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 760) {
        setItemsPerPage(4);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else if (width < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

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
    <div className="flex flex-col min-h-screen lg:overflow-hidden lg:h-screen gap-8 md:gap-4 justify-between">
      <header className="mt-8 sm:mt-10 flex justify-between items-start sm:items-center gap-4 ">
        <div className='flex-1 min-w-0'>
          <h1 className='text-white text-xl sm:text-2xl font-bold tracking-tight truncate'>Projetos</h1>
          <p className="text-gray-300 text-xs sm:text-sm tracking-tight ">Gerencie seus projetos e acompanhe o progresso</p>
        </div>
        <Link to="/home/novo-projeto">
          <Button variant="brancoBordas" size="iconbutton">
            <Plus />
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex border-white/15 rounded-lg border p-3 sm:p-4 items-center gap-2 sm:gap-3">
          <div className="bg-primaryPurple/35 h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg flex justify-center items-center ">
            <FolderOpen className="text-primaryPurple" size={24} />
          </div>
          <div className="ml-0 md:ml-4 tracking-tight truncate w-full">
            <p className="text-white text-base md:text-xl  font-bold tracking-tight truncate w-full">12</p>
            <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">Projetos</p>
          </div>
        </div>
        <div className="flex border-white/15 rounded-lg border p-3 sm:p-4 items-center gap-2 sm:gap-3">
          <div className="bg-primaryBlue/35 h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg flex justify-center items-center">
            <AlarmClock className="text-primaryBlue" size={24} />
          </div>
          <div className="ml-0 md:ml-4 tracking-tight truncate w-full">
            <p className="text-white text-base md:text-xl font-bold tracking-tight truncate w-full">180h 25m</p>
            <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">Tempo Total</p>
          </div>
        </div>
        <div className="flex border-white/15 rounded-lg border p-3 sm:p-4 items-center gap-2 sm:gap-3">
          <div className="bg-primaryOrange/35 h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg flex justify-center items-center">
            <TrendingUp className="text-primaryOrange" size={24} />
          </div>
          <div className="ml-0 md:ml-4 tracking-tight truncate w-full">
            <p className="text-white text-base md:text-xl font-bold tracking-tight truncate w-full">240</p>
            <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">Sessões</p>
          </div>
        </div>
        <div className="flex border-white/15 rounded-lg border p-3 sm:p-4 items-center gap-2 sm:gap-3">
          <div className="bg-primaryGreen/35 h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg flex justify-center items-center">
            <Check className="text-primaryGreen " size={24} />
          </div>
          <div className="ml-0 md:ml-4 tracking-tight truncate w-full">
            <p className="text-white text-base md:text-xl font-bold tracking-tight truncate w-full">1</p>
            <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">Concluidos</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row border-white/15 rounded-lg border p-2 sm:p-2 gap-3">
        <div className="relative w-full sm:w-auto sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Buscar Projetos..."
            className="bg-primaryBackground border-white/15 text-white pl-10 focus-visible:ring-primaryPurple h-9"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:flex-1">
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
        <Button variant="brancoBordas" className="flex-shrink-0 gap-2"><Funnel size={16} /> Limpar</Button>
      </div>

      <div className="flex-1 md:h-[44%] md:flex-none w-full relative">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 h-full auto-rows-fr"
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

      <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
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