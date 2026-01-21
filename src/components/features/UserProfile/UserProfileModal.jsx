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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User } from "lucide-react"

import { USERS_MOCK, CURRENT_USER_ID } from "@/mocks/userMock"
import { ProfileTab } from "./ProfileTab"
import { SettingsTab } from "./SettingsTab"
import { StatsTab } from "./StatsTab"

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

                    <TabsContent value="profile" className="flex-1 flex flex-col min-h-0">
                        <ProfileTab
                            userData={userData}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setUserData={setUserData}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            achievements={achievements}
                        />
                    </TabsContent>

                    <TabsContent value="settings" className="flex-1 flex flex-col min-h-0">
                        <SettingsTab
                            userData={userData}
                            setUserData={setUserData}
                        />
                    </TabsContent>

                    <TabsContent value="stats" className="flex-1 flex flex-col min-h-0">
                        <StatsTab stats={stats} />
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
