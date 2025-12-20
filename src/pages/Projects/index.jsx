import { useState, useEffect } from 'react';
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
  Search
} from "lucide-react"
import { PaginationProjects } from "../../components/PaginationProjects"
import { ProjectCard } from "../../components/ProjectCard"
import { PROJECTS_MOCK } from "../../mocks/projectsMock"

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const totalItems = PROJECTS_MOCK.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentProjects = PROJECTS_MOCK.slice(startIndex, startIndex + itemsPerPage)

  const emptySlots = itemsPerPage - currentProjects.length
  return (
    <div className="flex flex-col h-screen gap-4">
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
        <div className="w-[18%] flex border-white/15 rounded-lg border pl-6 p-3 items-center ">
          <div className="bg-primaryPurple/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex ">
            <FolderOpen className="text-primaryPurple" size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Total de Projetos</p>
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">12</p>
          </div>
          
        </div>
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center">
          <div className="bg-primaryBlue/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex">
            <AlarmClock className="text-primaryBlue" size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Tempo Total</p>
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">180h 25m</p>
          </div>
          
        </div>
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center">
          <div className="bg-primaryOrange/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex">
            <TrendingUp className="text-primaryOrange" size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Sessões</p>
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">240</p>
          </div>
          
        </div>
        <div className="w-[20%] flex border-white/15 rounded-lg border pl-6 p-3 items-center">
          <div className="bg-primaryGreen/35 h-[80%] w-[35%] rounded-lg justify-center items-center flex">
            <Check className="text-primaryGreen " size={24}/>
          </div>
          <div className="ml-4 tracking-tight truncate w-full">
            <p className="text-gray-300 text-sm tracking-tight truncate w-full">Concluidos</p>
            <p className="text-white text-xl font-bold tracking-tight truncate w-full">1</p>
          </div>
        </div>
      </div>
      <div className="flex h-[8%] border-white/15 rounded-lg border p-2 items-center justify-between gap-8 tracking-tight truncate">
        <div className="relative w-[40%] tracking-tight truncate">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            id="title" 
            placeholder="Buscar Projetos..." 
            className="bg-primaryBackground border-white/15 text-white pl-10 focus-visible:ring-primaryPurple h-10" 
          />
        </div>
        <div className="w-[50%] flex gap-8">
          <Select>
          <SelectTrigger className="w-full bg-primaryBackground border-white/15 text-white tracking-tight truncate">
            <SelectValue placeholder="Selecione o Status" />
          </SelectTrigger>
          <SelectContent className="bg-primaryBackground border-white/15 text-white ">
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="concluido">Concluido</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full bg-primaryBackground border-white/15 text-white tracking-tight truncate">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent className="bg-primaryBackground border-white/15 text-white">
            <SelectGroup>
              <SelectLabel>Prioridades</SelectLabel>
              <SelectItem value="todas">Todas as Prioridades</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
        
        <Button variant="brancoBordas" size="default" className="flex-shrink-0 tracking-tight truncate"><Funnel/> Limpar</Button>
      </div>

      <div className="h-[44%] w-full">
        <div className="grid grid-cols-4 h-full gap-6 w-full">
          {currentProjects.slice(0,4).map((project) => (
            <ProjectCard 
              key={project.id}
              {...project}
            />
          ))}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <div 
              key={`empty-${index}`} 
              className="flex-1 min-w-[320px] invisible" 
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-300 text-sm">Mostrando {currentProjects.length} de {totalItems} projetos</p>
        <div>
          <PaginationProjects 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
