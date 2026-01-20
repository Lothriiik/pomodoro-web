import { useState, useEffect, React } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, Plus} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

const projectColors = [
  { id: "purple", var: "var(--color-primaryPurple)" },
  { id: "blue", var: "var(--color-primaryBlue)" },
  { id: "green", var: "var(--color-primaryGreen)" },
  { id: "pink", var: "var(--color-primaryPink)" },
  { id: "orange", var: "var(--color-primaryOrange)" },
  { id: "red", var: "var(--color-primaryRed)" },
  { id: "yellow", var: "var(--color-primaryYellow)" },
  { id: "cyan", var: "var(--color-primaryCyan)" },
]

const PriorityItem = ({ value, label, color }) => (
  <ToggleGroupItem 
    value={value} 
    style={{ "--prio-color": color }}
    className="md:h-[clamp(2.0rem,4vw,3rem)] flex justify-start gap-3 px-4 rounded-xl border border-white/10  data-[state=on]:border-[var(--prio-color)] transition-all w-full"
  >
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-sm text-white">{label}</span>
  </ToggleGroupItem>
)

function DateInputPicker({ label }) {
  const [date, setDate] = useState(null)

  return (
    <div className="gap-2 flex flex-col w-[50%]">
      <label className="text-sm font-normal text-white">
        {label}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <div className="relative cursor-pointer">
            <Input
              readOnly
              value={date ? format(date, "dd / MM / yyyy") : ""}
              placeholder="dd / mm / aaaa"
              className="border-white/10 h-11 text-gray-300 text-sm md:text-md pr-10"
            />
            <CalendarIcon
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
            />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}

          />
        </PopoverContent>
      </Popover>
    </div>
  )
}


export default function NewProjects() {
  const [selectedColor, setSelectedColor] = useState("purple")
  return (
    <div className="flex flex-col min-h-screen w-full md:gap-0 mx-auto text-white overflow-y-auto">
      
      <header className="h-[9vh] mt-10 flex justify-between md-0 md:mb-4  items-center ">
        <div className='h-full'>
          <h1 className='text-white text-xl sm:text-2xl font-bold tracking-tight truncate'>Novo Projeto</h1>
          <p className="text-gray-300 text-xs sm:text-sm tracking-tight truncate">Gerencie seus projetos e acompanhe o progresso</p>
        </div>
      </header>

      <div className="flex flex-col gap-4 md:gap-24 md:h-[70vh] md:flex-row">
        <div className="w-[100%] gap-4 md:gap-0  md:justify-between flex flex-col h-full md:w-[50%]">
          <div className="gap-2 flex flex-col md:h-[19%]">
            <label className="text-sm font-normal text-white">Nome do Projeto</label>
            <Input placeholder="Ex: Website Redesign" className="bg-transparent border-white/20 h-11" />
          </div>

          <div className="gap-2 flex flex-col md:h-[31%]">
            <label className="text-sm font-normal text-white">Descrição</label>
            <Textarea placeholder="Descreva os objetivos..." className="bg-transparent border-white/20 h-25 resize-none" />
          </div>

          <div className="flex justify-between md:h-[20%]">
            <div className=" w-[45%] gap-2 flex flex-col">
              <label className="text-sm font-normal text-white">Metas de Sessões</label>
              <Input type="number" placeholder="Ex: 50" className="bg-transparent border-white/20 h-11 text-sm md:text-md" />
            </div>
            <div className="w-[45%] gap-2 flex flex-col ">
              <label className="text-sm font-normal text-white">Metas de Horas</label>
              <Input type="number" placeholder="Ex: 40" className="bg-transparent border-white/20 h-11 text-sm md:text-md" />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:h-[30%] ">
            <span className="text-sm font-normal text-white">Cor do Projeto</span>
            <ToggleGroup 
              type="single" 
              value={selectedColor} 
              onValueChange={(val) => val && setSelectedColor(val)}
              className="grid grid-cols-4 gap-2 md:gap-6 flex-1"
            >
              {projectColors.map((color) => (
                <ToggleGroupItem
                  key={color.id}
                  value={color.id}
                  style={{ "--active-color": color.var }}
                  className="md:h-full w-full rounded-xl border border-white/15 bg-primaryBackground transition-all
                              hover:border-[var(--active-color)] 
                              data-[state=on]:border-[var(--active-color)] "
                >
                  <div 
                    className="h-4 w-full rounded-full" 
                    style={{ backgroundColor: color.var }} 
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="w-[100%] flex flex-col h-full md:w-[50%] gap-4 md:gap-0 md:justify-between">
          <div className="md:h-[32%] h-30 gap-2 flex flex-col ">
            <label className="text-sm font-normal text-white">Prioridade</label>
            <ToggleGroup type="single" defaultValue="media" className="grid grid-cols-2 gap-3">
              <PriorityItem value="baixa" label="Baixa" color="var(--color-primaryGreen)" />
              <PriorityItem value="media" label="Média" color="var(--color-primaryYellow)" />
              <PriorityItem value="alta" label="Alta" color="var(--color-primaryOrange)" />
              <PriorityItem value="urgente" label="Urgente" color="var(--color-primaryPurple)" />
            </ToggleGroup>
          </div>

          <div className="gap-2 flex justify-between md:h-[19%]">
             <DateInputPicker label="Data de Início" />
             <DateInputPicker label="Data de Entrega" />
          </div>

          <div className="md:h-[49%] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-normal text-white">Tarefas Iniciais</label>
              <Button variant="brancoBordas" size="add" className="size-8 rounded-full border-white/10 bg-white/5"><Plus/></Button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-white/10 custom-scrollbar">
              <div className="flex flex-col ">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex tracking-tight truncate w-full shrink-0 items-center justify-between p-3 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded accent-primaryPurple" />
                      <span className="text-sm text-gray-400">Tarefa de exemplo {i}</span>
                    </div>
                    <span className="text-[11px] font-mono text-gray-500">02:30h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex justify-end gap-4 mt-2 p-2 mb-4">
        <Button variant="cancelar" >
          Cancelar
        </Button>
        <Button variant="roxo" >
          Criar Projeto
        </Button>
      </footer>
    </div>
  );
}