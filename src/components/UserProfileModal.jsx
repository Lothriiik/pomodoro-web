import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
    User,
    Bell,
    Clock,
    Target,
    Trophy,
    Calendar,
    Volume2,
    Moon,
    Pencil,
    Camera,
    Save,
    X,
    Flame,
    CheckCircle2,
    BarChart3,
    Zap,
    TrendingUp,
    Award,
    Coffee,
    Timer,
} from "lucide-react"

import { USERS_MOCK, CURRENT_USER_ID } from "../mocks/userMock"

export function UserProfileModal({ open, onOpenChange }) {
    const [isEditing, setIsEditing] = useState(false)


    const currentUser = USERS_MOCK.find(user => user.id === CURRENT_USER_ID) || USERS_MOCK[0]

    const [userData, setUserData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar,
        memberSince: currentUser.memberSince,
        pomodoroLength: currentUser.preferences.pomodoroLength,
        shortBreak: currentUser.preferences.shortBreak,
        longBreak: currentUser.preferences.longBreak,
        dailyGoal: currentUser.preferences.dailyGoal,
        weeklyGoal: currentUser.preferences.weeklyGoal,
        soundEnabled: currentUser.preferences.soundEnabled,
        notificationsEnabled: currentUser.preferences.notificationsEnabled,
        darkMode: currentUser.preferences.darkMode,
        autoStartBreaks: currentUser.preferences.autoStartBreaks,
        autoStartPomodoros: currentUser.preferences.autoStartPomodoros,
    })

    const stats = currentUser.stats
    const achievements = currentUser.achievements

    const handleSave = () => {
        const userIndex = USERS_MOCK.findIndex(u => u.id === CURRENT_USER_ID);
        if (userIndex !== -1) {
            USERS_MOCK[userIndex] = {
                ...USERS_MOCK[userIndex],
                name: userData.name,
                email: userData.email,
                preferences: {
                    ...USERS_MOCK[userIndex].preferences,
                    pomodoroLength: userData.pomodoroLength,
                    shortBreak: userData.shortBreak,
                    longBreak: userData.longBreak,
                    dailyGoal: userData.dailyGoal,
                    weeklyGoal: userData.weeklyGoal,
                    soundEnabled: userData.soundEnabled,
                    notificationsEnabled: userData.notificationsEnabled,
                    darkMode: userData.darkMode,
                    autoStartBreaks: userData.autoStartBreaks,
                    autoStartPomodoros: userData.autoStartPomodoros,
                }
            };
            window.dispatchEvent(new Event('user-preferences-updated'));
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90%] sm:max-w-[600px]  h-[80vh] flex flex-col bg-primaryBackground border-white/10 text-white p-0 gap-0 overflow-hidden rounded-xl md:rounded-lg">
                <DialogHeader className="p-6 md:p-6 pb-2 md:pb-4 shrink-0">
                    <DialogTitle className="flex items-center gap-2 text-white text-lg md:text-xl">
                        <User className="w-4 h-4 md:w-5 md:h-5" />
                        Perfil do Usuário
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-xs md:text-sm">
                        Gerencie suas informações pessoais e configurações
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="profile" className="flex-1 flex flex-col min-h-0 w-full p-2 md:p-4">
                    <div className="px-4 md:px-6 shrink-0">
                        <TabsList className="grid w-full grid-cols-3 bg-primaryBackground border-primaryBackground border-white/10 text-gray-400 h-9 md:h-10">
                            <TabsTrigger value="profile" className="text-xs md:text-sm data-[state=active]:bg-primaryPurple data-[state=active]:text-primaryBackground">Perfil</TabsTrigger>
                            <TabsTrigger value="settings" className="text-xs md:text-sm data-[state=active]:bg-primaryPurple data-[state=active]:text-primaryBackground">Configurações</TabsTrigger>
                            <TabsTrigger value="stats" className="text-xs md:text-sm data-[state=active]:bg-primaryPurple data-[state=active]:text-primaryBackground">Estatísticas</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="profile" className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 md:space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="w-16 h-16 md:w-20 md:h-20">
                                    <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xl md:text-2xl bg-zinc-800 text-zinc-300">
                                        {userData.name.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 w-6 h-6 md:w-7 md:h-7 bg-primaryPurple rounded-full flex items-center justify-center hover:bg-primaryPurple/80 transition-colors">
                                        <Camera className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                    </button>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg md:text-xl font-semibold text-white">{userData.name}</h3>
                                </div>
                                <p className="text-xs md:text-sm text-gray-400">{userData.email}</p>
                                <p className="text-[10px] md:text-xs text-gray-500 mt-1">
                                    Membro desde {userData.memberSince}
                                </p>
                            </div>
                            {!isEditing && (
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="border-white/10 hover:bg-white/10 text-white">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Editar
                                </Button>
                            )}
                        </div>

                        {isEditing && (
                            <div className="space-y-4 p-4 rounded-lg bg-primaryBackground  border border-white/10">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-gray-300">Nome</Label>
                                        <Input
                                            id="name"
                                            value={userData.name}
                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                            className="bg-primaryBackground border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            className="bg-primaryBackground border-white/10 text-white"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <Button variant="cancelar" size="sm" onClick={handleCancel} className="text-gray-400 hover:text-white hover:bg-white/10">
                                        <X className="w-4 h-4 mr-2" />
                                        Cancelar
                                    </Button>
                                    <Button size="sm" variant="roxo" onClick={handleSave} className="bg-primaryPurple hover:bg-primaryPurple/90 text-white">
                                        <Save className="w-4 h-4 mr-2" />
                                        Salvar
                                    </Button>
                                </div>
                            </div>
                        )}

                        <Separator className="bg-white/10" />

                        <div className="flex-1 flex flex-col min-h-0">
                            <h4 className="font-medium mb-3 flex items-center gap-2 text-white shrink-0">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                Conquistas
                            </h4>
                            <div className="grid grid-cols-1 gap-2 overflow-y-auto pr-1 custom-scrollbar">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.name}
                                        className={`flex items-center gap-3 p-3 rounded-lg border ${achievement.unlocked
                                            ? "bg-primaryPurple/10 border-primaryPurple/30"
                                            : "bg-white/5 border-white/10 opacity-50"
                                            }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.unlocked ? "bg-primaryPurple text-white" : "bg-zinc-800 text-gray-500"
                                                }`}
                                        >
                                            <Trophy className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-white">{achievement.name}</p>
                                            <p className="text-xs text-gray-400">{achievement.description}</p>
                                        </div>
                                        {achievement.unlocked && (
                                            <Badge variant="secondary" className="text-xs bg-primaryPurple/20 text-primaryPurple hover:bg-primaryPurple/30">Desbloqueado</Badge>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings" className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 md:space-y-6">
                        <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2 text-white text-sm md:text-base">
                                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                                Temporizador (min)
                            </h4>
                            <div className="grid gap-3 md:gap-4">
                                <div className="grid grid-cols-3 gap-3 md:gap-4">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <Label htmlFor="pomodoro" className="text-gray-300 text-xs md:text-sm">Pomodoro</Label>
                                        <Input
                                            id="pomodoro"
                                            type="number"
                                            value={userData.pomodoroLength}
                                            onChange={(e) =>
                                                setUserData({ ...userData, pomodoroLength: Number(e.target.value) })
                                            }
                                            className="bg-primaryBackground border-white/10 text-white h-9 md:h-10 text-xs md:text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <Label htmlFor="shortBreak" className="text-gray-300 text-xs md:text-sm">Pausa Curta</Label>
                                        <Input
                                            id="shortBreak"
                                            type="number"
                                            value={userData.shortBreak}
                                            onChange={(e) =>
                                                setUserData({ ...userData, shortBreak: Number(e.target.value) })
                                            }
                                            className="bg-primaryBackground border-white/10 text-white h-9 md:h-10 text-xs md:text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <Label htmlFor="longBreak" className="text-gray-300 text-xs md:text-sm">Pausa Longa</Label>
                                        <Input
                                            id="longBreak"
                                            type="number"
                                            value={userData.longBreak}
                                            onChange={(e) =>
                                                setUserData({ ...userData, longBreak: Number(e.target.value) })
                                            }
                                            className="bg-primaryBackground border-white/10 text-white h-9 md:h-10 text-xs md:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2 text-white text-sm md:text-base">
                                <Target className="w-3 h-3 md:w-4 md:h-4" />
                                Metas
                            </h4>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="dailyGoal" className="text-gray-300 text-xs md:text-sm">Diária (pomodoros)</Label>
                                    <Input
                                        id="dailyGoal"
                                        type="number"
                                        value={userData.dailyGoal}
                                        onChange={(e) =>
                                            setUserData({ ...userData, dailyGoal: Number(e.target.value) })
                                        }
                                        className="bg-primaryBackground border-white/10 text-white h-9 md:h-10 text-xs md:text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="weeklyGoal" className="text-gray-300 text-xs md:text-sm">Semanal (pomodoros)</Label>
                                    <Input
                                        id="weeklyGoal"
                                        type="number"
                                        value={userData.weeklyGoal}
                                        onChange={(e) =>
                                            setUserData({ ...userData, weeklyGoal: Number(e.target.value) })
                                        }
                                        className="bg-primaryBackground border-white/10 text-white h-9 md:h-10 text-xs md:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2 text-white text-sm md:text-base">
                                <Bell className="w-3 h-3 md:w-4 md:h-4" />
                                Preferências
                            </h4>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                                        <Label htmlFor="sound" className="text-gray-300 text-xs md:text-sm">Sons</Label>
                                    </div>
                                    <Switch
                                        id="sound"
                                        checked={userData.soundEnabled}
                                        onCheckedChange={(checked) =>
                                            setUserData({ ...userData, soundEnabled: checked })
                                        }
                                        className="data-[state=checked]:bg-primaryPurple scale-90 md:scale-100"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                                        <Label htmlFor="notifications" className="text-gray-300 text-xs md:text-sm">Notificações</Label>
                                    </div>
                                    <Switch
                                        id="notifications"
                                        checked={userData.notificationsEnabled}
                                        onCheckedChange={(checked) =>
                                            setUserData({ ...userData, notificationsEnabled: checked })
                                        }
                                        className="data-[state=checked]:bg-primaryPurple scale-90 md:scale-100"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                                        <Label htmlFor="autoBreaks" className="text-gray-300 text-xs md:text-sm">Auto-iniciar pausas</Label>
                                    </div>
                                    <Switch
                                        id="autoBreaks"
                                        checked={userData.autoStartBreaks}
                                        onCheckedChange={(checked) =>
                                            setUserData({ ...userData, autoStartBreaks: checked })
                                        }
                                        className="data-[state=checked]:bg-primaryPurple scale-90 md:scale-100"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                                        <Label htmlFor="autoPomodoros" className="text-gray-300 text-xs md:text-sm">Auto-iniciar pomodoros</Label>
                                    </div>
                                    <Switch
                                        id="autoPomodoros"
                                        checked={userData.autoStartPomodoros}
                                        onCheckedChange={(checked) =>
                                            setUserData({ ...userData, autoStartPomodoros: checked })
                                        }
                                        className="data-[state=checked]:bg-primaryPurple scale-90 md:scale-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 md:space-y-6">

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
                    </TabsContent>
                </Tabs>

                <DialogFooter className="p-6 pt-4 shrink-0">
                    <Button variant="cancelar" onClick={() => onOpenChange(false)} className="border-white/10 hover:bg-white/10 text-white w-full sm:w-auto">
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
