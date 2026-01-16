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

export function ModalAddActivity({ day }) {
  return (
    <Dialog>
      <DialogTrigger asChild  >
        <button
          onClick={(e) => e.stopPropagation()} 
          className="absolute md:-bottom-4 -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-primaryBackground rounded-full flex items-center justify-center border border-primaryPurple hover:scale-110 transition-transform shadow-lg z-10"
        >
          <Plus className="text-primaryPurple" size={16}></Plus>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-primaryBackground border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Adicionar Tarefa</DialogTitle>
          <p className="text-gray-400 text-sm">{day}</p>
        </DialogHeader>

        <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-gray-400">Título</Label>
            <Input id="title" placeholder="Nome da tarefa" className="bg-primaryBackground border-white/15 text-white" />
          </div>

          <div className="flex gap-4">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="time" className="text-zinc-400">Horário</Label>
              <Input id="time" type="time" className="bg-primaryBackground border-white/15 text-white" />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="cycle" className="text-zinc-400">Ciclo</Label>
              <Input id="cycle" type="number" className="bg-primaryBackground border-white/15 text-white" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-zinc-400">Categoria</Label>
            <Select>
              <SelectTrigger className="w-full bg-primaryBackground border-white/15 text-white">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent className="bg-primaryBackground border-white/15 text-white">
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="trabalho">Trabalho</SelectItem>
                  <SelectItem value="estudos">Estudos</SelectItem>
                  <SelectItem value="faculdade">Faculdade</SelectItem>
                  <SelectItem value="livros">Livros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="cancelar" >Cancelar</Button>
            </DialogClose>
            <Button type="submit" variant="roxo" className="bg-primaryPurple hover:bg-primaryPurple/90 text-white">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}