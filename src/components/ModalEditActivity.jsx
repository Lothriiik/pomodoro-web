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
import { PROJECTS_MOCK } from "@/mocks/projectsMock"
import { useState, useEffect } from "react"

export function ModalEditActivity({ task, open, onOpenChange, onSave }) {
    const [title, setTitle] = useState("")
    const [time, setTime] = useState("")
    const [cycle, setCycle] = useState(1)
    const [projectId, setProjectId] = useState("")

    useEffect(() => {
        if (task) {
            setTitle(task.title || "")
            setTime(task.time || "")
            setCycle(task.cycle || 1)
            setProjectId(task.projectId ? String(task.projectId) : "")
        }
    }, [task])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave({
                ...task,
                title,
                time,
                cycle,
                projectId: projectId ? Number(projectId) : null
            });
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl md:rounded-lg bg-primaryBackground border-zinc-800 text-white gap-4">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg md:text-xl">Editar Tarefa</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-3 md:gap-4 py-2 md:py-4">
                    <div className="grid gap-1.5 md:gap-2">
                        <Label htmlFor="title-edit" className="text-gray-400 text-xs md:text-sm">Título</Label>
                        <Input
                            id="title-edit"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nome da tarefa"
                            className="bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm"
                        />
                    </div>

                    <div className="flex gap-3 md:gap-4">
                        <div className="grid gap-1.5 md:gap-2 flex-1">
                            <Label htmlFor="time-edit" className="text-zinc-400 text-xs md:text-sm">Horário</Label>
                            <Input
                                id="time-edit"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                type="text"
                                className="bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm"
                            />
                        </div>
                        <div className="grid gap-1.5 md:gap-2 flex-1">
                            <Label htmlFor="cycle-edit" className="text-zinc-400 text-xs md:text-sm">Ciclo</Label>
                            <Input
                                id="cycle-edit"
                                type="number"
                                value={cycle}
                                onChange={(e) => setCycle(Number(e.target.value))}
                                className="bg-primaryBackground border-white/15 text-white h-9 md:h-10 text-xs md:text-sm"
                            />
                        </div>
                    </div>

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

                    <DialogFooter className="mt-2 md:mt-4 gap-2">
                        <Button type="button" size="sm" variant="cancelar" onClick={() => onOpenChange(false)} className="text-xs md:text-sm">Cancelar</Button>
                        <Button type="submit" size="sm" variant="roxo" className="bg-primaryPurple hover:bg-primaryPurple/90 text-white text-xs md:text-sm">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
