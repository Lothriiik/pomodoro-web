import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Clock, Target, Bell, Volume2 } from "lucide-react"

export function SettingsTab({ userData, setUserData }) {
    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 md:space-y-6">
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
        </div>
    )
}
