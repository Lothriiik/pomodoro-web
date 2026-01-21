import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@/components/ui/empty";
import { ClipboardList, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, Play, Pencil, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityModal } from "../../common/ActivityModal";

import { TASKS_MOCK } from "../../../mocks/tasksMock";

export default function TaskArea({ activeTaskId, onPlayTask }) {
    const [filterType, setFilterType] = useState('pending');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [tasks, setTasks] = useState(TASKS_MOCK);

    const handlePrevDay = () => setSelectedDate(prev => subDays(prev, 1));
    const handleNextDay = () => setSelectedDate(prev => addDays(prev, 1));

    const handleAddTask = (newTask) => {
        setTasks(prev => [...prev, {
            id: Date.now(),
            title: newTask.title || "Nova Tarefa",
            completed: false,
            date: selectedDate,
            ...newTask
        }]);
    };

    const handleSaveEditedTask = (updatedTask) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
        setEditingTask(null);
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesDate = isSameDay(new Date(task.date), selectedDate);
            const matchesStatus = filterType === 'pending' ? !task.completed : task.completed;
            return matchesDate && matchesStatus;
        });
    }, [tasks, selectedDate, filterType]);

    return (
        <div className="flex flex-col bg-primaryBackground rounded-lg border border-white/10 h-[280px] w-full md:w-[430px] md:h-full overflow-hidden mt-8 md:mt-0">
            <div className="p-4 border-b border-white/10 flex flex-col gap-4">
                <div className="flex bg-primaryBackground p-1 rounded-lg w-full">
                    {['Pendentes', 'Concluídas'].map((range) => {
                        const type = range === 'Pendentes' ? 'pending' : 'completed';
                        const isActive = filterType === type;
                        return (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={cn(
                                    "flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                    isActive ? "bg-primaryPurple text-primaryBackground  shadow-sm" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {range}
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={handlePrevDay} className="h-8 w-8 text-gray-400 hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="brancoBordas"
                                className={cn(
                                    "w-[180px] justify-center text-left font-normal h-8 text-xs border-white/10 bg-transparent text-primaryBackground hover:bg-white/5 hover:text-white",
                                    !selectedDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                                {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-primaryBackground border-white/10" align="center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    if (date) {
                                        setSelectedDate(date);
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

                    <Button variant="ghost" size="icon" onClick={handleNextDay} className="h-8 w-8 text-gray-400 hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-130px)] p-4 custom-scrollbar flex flex-col">
                <div className="space-y-2 flex-1">
                    {filteredTasks.map(task => {
                        const isActive = task.id === activeTaskId;
                        return (
                            <div
                                key={task.id}
                                className={cn(
                                    "group p-3 h-16 rounded-lg border text-white flex items-center justify-between transition-all",
                                    isActive ? "border-primaryPurple bg-white/5" : "border-white/5 hover:border-primaryPurple"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleTaskCompletion(task.id)}
                                        className={cn(
                                            "w-5 h-5 rounded-full border border-white/30 flex items-center justify-center transition-all",
                                            task.completed ? "bg-primaryPurple border-primaryPurple" : "hover:border-primaryPurple"
                                        )}
                                    >
                                        {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
                                    </button>
                                    <span className={cn("text-xs md:text-sm transition-all", task.completed && "line-through text-gray-500")}>
                                        {task.title}
                                    </span>
                                </div>

                                <div className={cn("flex items-center gap-2 transition-opacity", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                                    {!task.completed && (
                                        <button
                                            onClick={() => onPlayTask && onPlayTask(task.id)}
                                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                            title="Iniciar Pomodoro"
                                        >
                                            <Play className={cn("w-4 h-4", isActive && "fill-current text-primaryPurple")} />
                                        </button>
                                    )}
                                    <button
                                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                        title="Editar"
                                        onClick={() => setEditingTask(task)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filterType === 'pending' && filteredTasks.length > 0 && (
                    <div className="mt-4">
                        <ActivityModal
                            defaultDate={selectedDate}
                            onSave={handleAddTask}
                            trigger={
                                <button className="w-full py-3 border-2 border-dashed border-white/10 rounded-lg text-gray-400 text-sm hover:border-white/30 hover:text-white transition-all flex items-center justify-center gap-2 group">
                                    <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                                        <Plus className="w-3.5 h-3.5" />
                                    </div>
                                    Adicionar nova tarefa
                                </button>
                            }
                        />
                    </div>
                )}

                {filteredTasks.length === 0 && (
                    <div className="h-full flex items-center justify-center mt-4">
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia>
                                    <ClipboardList className="w-8 h-8 text-white/50" />
                                </EmptyMedia>
                                <EmptyTitle className="text-white text-sm">
                                    {filterType === 'pending' ? 'Nenhuma tarefa pendente' : 'Nenhuma tarefa concluída'}
                                </EmptyTitle>
                                <EmptyDescription className="text-xs">
                                    {filterType === 'pending'
                                        ? 'Você não tem tarefas para este dia.'
                                        : 'Nenhuma tarefa foi concluída neste dia.'}
                                </EmptyDescription>
                            </EmptyHeader>
                            {filterType === 'pending' && (
                                <EmptyContent>
                                    <ActivityModal
                                        defaultDate={selectedDate}
                                        onSave={handleAddTask}
                                        trigger={
                                            <Button variant="roxo" size="sm">
                                                Adicionar Tarefa
                                            </Button>
                                        }
                                    />
                                </EmptyContent>
                            )}
                        </Empty>
                    </div>
                )}
            </div>

            <ActivityModal
                task={editingTask}
                open={!!editingTask}
                onOpenChange={(open) => !open && setEditingTask(null)}
                onSave={handleSaveEditedTask}
                showDefaultTrigger={false}
            />
        </div>
    );
}
