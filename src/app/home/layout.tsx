"use client"
import React from "react"
import { 
  useSidebar, SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, 
  SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupContent, 
  SidebarFooter, SidebarContent 
} from "@/components/ui/sidebar"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlarmClock, Calendar, ChartColumn, ListChecks, FolderOpen, User, Cog, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full">
        
        <Sidebar className="border-sidebar-border" collapsible="icon">
          
          <SidebarHeader>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="px-2"
            >
              <motion.div
                key={open ? "open" : "closed"}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={open ? "/ampulheta-roxa.png" : "/ampulheta-cinza.png"}
                  alt="Ampulheta"
                  width={24}
                  height={24}
                />
              </motion.div>
            </Button>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => router.push("/home/pomodoro")}
                      className={`!w-full flex items-center gap-2 ${
                        pathname === "/home/pomodoro"
                          ? "text-primaryPurple"   
                          : ""       
                      }`}>
                      <AlarmClock className="!w-5 !h-5" />
                      Pomodoro
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                    onClick={() => router.push("/home/calendario")}
                    className={`!w-full flex items-center gap-2 ${
                        pathname === "/home/calendario"
                          ? "text-primaryPurple"   
                          : ""       
                      }`}>
                      <Calendar className="!w-5 !h-5" />
                      Calendário
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                    onClick={() => router.push("/home/atividades")}
                    className={`!w-full flex items-center gap-2 ${
                        pathname === "/home/atividades"
                          ? "text-primaryPurple"   
                          : ""       
                      }`}>
                      <ListChecks className="!w-5 !h-5" />
                      Atividades
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                    onClick={() => router.push("/home/estatisticas")}
                    className={`!w-full flex items-center gap-2 ${
                        pathname === "/home/estatisticas"
                          ? "text-primaryPurple"   
                          : ""       
                      }`}>
                      <ChartColumn className="!w-5 !h-5" />
                      Estatísticas
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton 
                    onClick={() => router.push("/home/projetos")}
                    className={`!w-full flex items-center gap-2 ${
                        pathname === "/home/projetos"
                          ? "text-primaryPurple"   
                          : ""       
                      }`}>
                      <FolderOpen className="!w-5 !h-5" />
                      Projetos
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User className="!w-5 !h-5"/>
                      Usuário
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent side="top" className="bg-sidebar border-sidebar-border">
                    <DropdownMenuItem className="flex items-center gap-2 text-sidebar-foreground">
                      <User />
                      <span>Conta</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="border-t-2 border-sidebar-border my-1" />

                    <DropdownMenuItem className="flex items-center gap-2 text-sidebar-foreground">
                      <Cog />
                      <span>Configurações</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

        </Sidebar>

        <main className="flex-1 p-6 bg-primaryBackground">
          {children}
        </main>

      </div>
    </SidebarProvider>
  )
}
