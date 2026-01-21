import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Camera, Pencil, Save, X, Trophy } from "lucide-react"

export function ProfileTab({
    userData,
    isEditing,
    setIsEditing,
    setUserData,
    handleSave,
    handleCancel,
    achievements
}) {
    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 md:space-y-6">
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
        </div>
    )
}
