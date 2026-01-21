import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
    Plus,
    Calendar as CalendarIcon
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function ModalAddNewProjectTask({ trigger, onSave, taskToEdit }) {
    const [title, setTitle] = useState(taskToEdit?.title || "")
    const [time, setTime] = useState(taskToEdit?.time || "")
    const [cycle, setCycle] = useState(taskToEdit?.cycle || "")
    const [date, setDate] = useState(taskToEdit?.date || new Date())
    const [open, setOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSave) {
            onSave({
                ...(taskToEdit || {}), 
                title: title || "Nova Tarefa",
                time: time || "00:00",
                cycle: Number(cycle) || 1,
                date: date
            });
        }
        setOpen(false);
        if (!taskToEdit) {

            setTitle("");
            setTime("");
            setCycle("");
            setDate(new Date());
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-6 h-6 bg-primaryBackground rounded-full flex items-center justify-center border border-primaryPurple hover:scale-110 transition-transform shadow-lg"
                    >
                        <Plus className="text-primaryPurple" size={16}></Plus>
                    </button>
                )}
            </DialogTrigger>

            <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl md:rounded-lg bg-primaryBackground border-zinc-800 text-white gap-4">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg md:text-xl">{taskToEdit ? "Editar Tarefa" : "Adicionar Tarefa Inicial"}</DialogTitle>
                    <p className="text-gray-400 text-xs md:text-sm">
                        {taskToEdit ? "Atualize os detalhes da tarefa." : "Defina os detalhes da tarefa para o novo projeto."}
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
                        <Label className="text-zinc-400 text-xs md:text-sm">Data</Label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="brancoBordas"
                                    className={cn(
                                        "w-full justify-start text-left font-normal border-white/15 bg-primaryBackground text-white hover:bg-white/5 h-9 md:h-10 text-xs md:text-sm",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-primaryBackground border-white/10" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => {
                                        if (d) {
                                            setDate(d);
                                            setIsCalendarOpen(false);
                                        }
                                    }}
                                    initialFocus
                                    locale={ptBR}
                                    className="text-white bg-primaryBackground"
                                    classNames={{
                                        day_selected: "bg-primaryPurple text-white hover:bg-primaryPurple hover:text-white focus:bg-primaryPurple focus:text-white",
                                        day_today: "bg-white/10 text-white",
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <DialogFooter className="mt-2 md:mt-4 gap-2">
                        <Button type="button" size="sm" variant="cancelar" onClick={() => setOpen(false)} className="text-xs md:text-sm">Cancelar</Button>
                        <Button type="submit" size="sm" variant="roxo" className="bg-primaryPurple hover:bg-primaryPurple/90 text-white text-xs md:text-sm">
                            {taskToEdit ? "Salvar" : "Adicionar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
