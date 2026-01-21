import { Card, CardContent } from "@/components/ui/card"
import { Timer, Clock, Flame, CheckCircle2, BarChart3, Zap, Award, Coffee } from "lucide-react"

export function StatsTab({ stats }) {
    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 md:space-y-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                <Card className="bg-primaryPurple/5 border-primaryPurple/20">
                    <CardContent className="p-3 md:p-4 text-center">
                        <Timer className="w-4 h-4 md:w-5 md:h-5 text-primaryPurple mx-auto mb-1" />
                        <p className="text-xl md:text-2xl font-bold text-white">{stats.totalPomodoros}</p>
                        <p className="text-[10px] text-gray-400">Pomodoros</p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardContent className="p-3 md:p-4 text-center">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mx-auto mb-1" />
                        <p className="text-xl md:text-2xl font-bold text-white">{stats.totalHours}h</p>
                        <p className="text-[10px] text-gray-400">Horas Foco</p>
                    </CardContent>
                </Card>
                <Card className="bg-orange-500/5 border-orange-500/20">
                    <CardContent className="p-3 md:p-4 text-center">
                        <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500 mx-auto mb-1" />
                        <p className="text-xl md:text-2xl font-bold text-white">{stats.currentStreak}</p>
                        <p className="text-[10px] text-gray-400">Sequência</p>
                    </CardContent>
                </Card>
                <Card className="bg-green-500/5 border-green-500/20">
                    <CardContent className="p-3 md:p-4 text-center">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500 mx-auto mb-1" />
                        <p className="text-xl md:text-2xl font-bold text-white">{stats.tasksCompleted}</p>
                        <p className="text-[10px] text-gray-400">Tarefas</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Card className="bg-primaryBackground border-white/10">
                    <CardContent className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2 text-sm text-white">
                            <BarChart3 className="w-4 h-4 text-blue-500" />
                            Médias Diárias
                        </h4>
                        <div className="space-y-2">
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Pomodoros</span>
                                <span className="font-medium text-white">{stats.avgPomodorosPerDay}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Horas de foco</span>
                                <span className="font-medium text-white">{stats.avgFocusTime}h</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Tempo médio</span>
                                <span className="font-medium text-white">{stats.avgSessionLength}min</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primaryBackground border-white/10">
                    <CardContent className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2 text-sm text-white ">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            Melhores Momentos
                        </h4>
                        <div className="space-y-2">
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Melhor dia</span>
                                <span className="font-medium text-white">{stats.bestDay}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Melhor horário</span>
                                <span className="font-medium text-white">{stats.bestHour}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Maior sessão</span>
                                <span className="font-medium text-white">{stats.longestSession}min</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Card className="bg-primaryBackground border-white/10">
                    <CardContent className=" space-y-3">
                        <h4 className="font-medium flex items-center gap-2 text-sm text-white">
                            <Flame className="w-4 h-4 text-orange-500" />
                            Sequências Gerais
                        </h4>
                        <div className="space-y-2">
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Sequência atual</span>
                                <span className="font-medium text-white">{stats.currentStreak} dias</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Maior sequência</span>
                                <span className="font-medium text-white">{stats.longestStreak} dias</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Semanas perfeitas</span>
                                <span className="font-medium text-white">{stats.perfectWeeks}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primaryBackground border-white/10">
                    <CardContent className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2 text-sm text-white">
                            <Award className="w-4 h-4 text-yellow-500" />
                            Metas Atingidas
                        </h4>
                        <div className="space-y-2">
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Dias</span>
                                <span className="font-medium text-white">{stats.goalsAchieved}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Projetos concluídos</span>
                                <span className="font-medium text-white">{stats.projectsCompleted}</span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-between text-sm">
                                <span className="text-gray-400 text-[10px] md:text-sm">Projetos ativos</span>
                                <span className="font-medium text-white">{stats.activeProjects}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-primaryBackground border-white/10">
                <CardContent className=" space-y-3">
                    <h4 className="font-medium flex items-center gap-2 text-sm text-white">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        Pausas e Descanso
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-base font-bold text-white">{stats.totalBreaks}</p>
                            <p className="text-[10px] md:text-xs text-gray-400">Pausas feitas</p>
                        </div>
                        <div className="text-center">
                            <p className="text-base font-bold text-white">{stats.breakTimeTotal}h</p>
                            <p className="text-[10px] md:text-xs text-gray-400">Tempo em pausas</p>
                        </div>
                        <div className="text-center">
                            <p className="text-base font-bold text-red-400">{stats.canceledPomodoros}</p>
                            <p className="text-[10px] md:text-xs text-gray-400">Cancelados</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
