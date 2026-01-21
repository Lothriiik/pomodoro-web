import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Plus
} from "lucide-react"
import { PROJECTS_MOCK } from "@/mocks/projectsMock"


export function ModalAddActivity({ day, trigger, onSave }) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [cycle, setCycle] = useState("")
  const [project, setProject] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave({
        title: title || "Nova Tarefa",
        time: time || "00:00",
        cycle: Number(cycle) || 1,
        project: project,
        date: day
      });
    }
    setOpen(false);
    // Reset form
    setTitle("");
    setTime("");
    setCycle("");
    setProject("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? trigger : (
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute md:-bottom-4 -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-primaryBackground rounded-full flex items-center justify-center border border-primaryPurple hover:scale-110 transition-transform shadow-lg z-10"
          >
            <Plus className="text-primaryPurple" size={16}></Plus>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl md:rounded-lg bg-primaryBackground border-zinc-800 text-white gap-4">
        <DialogHeader>
          <DialogTitle className="text-white text-lg md:text-xl">Adicionar Tarefa</DialogTitle>
          <p className="text-gray-400 text-xs md:text-sm">
            {day ? (day instanceof Date ? day.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : day) : 'Sem data selecionada'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-3 md:gap-4 py-2 md:py-4">
          <div className="grid gap-1.5 md:gap-2">
            <Label htmlFor="title" className="text-gray-400 text-xs md:text-sm">Título</Label>
            <Input
              id="title"
              placeholder="Nome da tarefa"
              className="bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-3 md:gap-4">
            <div className="grid gap-1.5 md:gap-2 flex-1">
              <Label htmlFor="time" className="text-zinc-400 text-xs md:text-sm">Horário</Label>
              <Input
                id="time"
                type="time"
                className="bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5 md:gap-2 flex-1">
              <Label htmlFor="cycle" className="text-zinc-400 text-xs md:text-sm">Ciclo</Label>
              <Input
                id="cycle"
                type="number"
                className="bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm"
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-1.5 md:gap-2">
            <Label className="text-zinc-400 text-xs md:text-sm">Projeto</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="w-full bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm">
                <SelectValue placeholder="Selecione o projeto" />
              </SelectTrigger>
              <SelectContent className="bg-primaryBackground border-white/15 text-white">
                <SelectGroup>
                  <SelectLabel className="text-xs md:text-sm">Projetos</SelectLabel>
                  {PROJECTS_MOCK.map((project) => (
                    <SelectItem key={project.id} value={String(project.id)} className="text-xs md:text-sm">{project.title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-2 md:mt-4 gap-2">
            <Button type="button" variant="cancelar" size="sm" onClick={() => setOpen(false)} className="text-xs md:text-sm">Cancelar</Button>
            <Button type="submit" variant="roxo" size="sm" className="bg-primaryPurple hover:bg-primaryPurple/90 text-white text-xs md:text-sm">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}