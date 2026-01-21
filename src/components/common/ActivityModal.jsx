import { useState, useEffect } from "react"
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Calendar as CalendarIcon } from "lucide-react"
import { PROJECTS_MOCK } from "@/mocks/projectsMock"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function ActivityModal({
    task,
    defaultDate,
    trigger,
    onSave,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    hideProjectSelect = false,
    enableDateSelect = false,
    showDefaultTrigger = true
}) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined

    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = isControlled ? setControlledOpen : setInternalOpen

    const isEditMode = !!task

    const [title, setTitle] = useState("")
    const [time, setTime] = useState("")
    const [cycle, setCycle] = useState(1)
    const [projectId, setProjectId] = useState("")
    const [date, setDate] = useState(defaultDate || new Date())
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    useEffect(() => {
        if (open) {
            if (isEditMode && task) {
                setTitle(task.title || "")
                setTime(task.time || "")
                setCycle(task.cycle || 1)
                setProjectId(task.projectId ? String(task.projectId) : (task.project ? String(task.project) : ""))
                setDate(task.date ? new Date(task.date) : (defaultDate || new Date()))
            } else {
                setTitle("")
                setTime("")
                setCycle(1)
                setProjectId("")
                setDate(defaultDate ? new Date(defaultDate) : new Date())
            }
        }
    }, [open, task, isEditMode, defaultDate])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSave) {
            const taskData = {
                title: title || "Nova Tarefa",
                time: time || "00:00",
                cycle: Number(cycle) || 1,
                projectId: !hideProjectSelect && projectId ? Number(projectId) : null,
                date: date,
                ...(isEditMode ? task : {})
            }

            if (isEditMode) {
                taskData.id = task.id;
            }

            onSave(taskData);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {(trigger || (!isEditMode && showDefaultTrigger)) && (
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
            )}

            <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl md:rounded-lg bg-primaryBackground border-zinc-800 text-white gap-4">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg md:text-xl">
                        {isEditMode ? "Editar Tarefa" : "Adicionar Tarefa"}
                    </DialogTitle>
                    {!enableDateSelect && !isEditMode && defaultDate && (
                        <p className="text-gray-400 text-xs md:text-sm">
                            {defaultDate instanceof Date
                                ? defaultDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
                                : defaultDate}
                        </p>
                    )}
                    {isEditMode && hideProjectSelect && (
                        <p className="text-gray-400 text-xs md:text-sm">
                            Atualize os detalhes da tarefa.
                        </p>
                    )}
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
                                onChange={(e) => setCycle(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {enableDateSelect && (
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
                                        {date && date instanceof Date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
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
                    )}

                    {!hideProjectSelect && (
                        <div className="grid gap-1.5 md:gap-2">
                            <Label className="text-zinc-400 text-xs md:text-sm">Projeto</Label>
                            <Select value={projectId} onValueChange={setProjectId}>
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
                    )}

                    <DialogFooter className="mt-2 md:mt-4 gap-2">
                        <Button type="button" variant="cancelar" size="sm" onClick={() => setOpen(false)} className="text-xs md:text-sm">Cancelar</Button>
                        <Button type="submit" variant="roxo" size="sm" className="bg-primaryPurple hover:bg-primaryPurple/90 text-white text-xs md:text-sm">
                            {isEditMode ? "Salvar" : "Adicionar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
