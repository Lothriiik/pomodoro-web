import React from "react"
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom"
import { motion, AnimatePresence  } from "framer-motion"
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import Pomodoro from "@/pages/Pomodoro"
import WeeklyPlanner from "@/pages/WeeklyPlanner"
import Projects from "@/pages/Projects"

import { Button } from "@/components/ui/button"
import {
  AlarmClock,
  Calendar,
  ChartColumn,
  ListChecks,
  FolderOpen,
  User,
  Cog,
  LogOut,
} from "lucide-react"

export default function HomeLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full bg-primaryBackground">

        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
            >
              <motion.img
                src={open ? "/ampulheta-roxa.png" : "/ampulheta-cinza.png"}
                alt="Logo"
                width={24}
                height={24}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
            </Button>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/home/pomodoro")}
                      className={location.pathname === "/home/pomodoro" ? "text-primaryPurple" : ""}
                    >
                      <AlarmClock className="w-5 h-5" />
                      Pomodoro
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => navigate("/home/semanal")}>
                      <Calendar className="w-5 h-5" />
                      Calendário
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => navigate("/home/atividades")}>
                      <ListChecks className="w-5 h-5" />
                      Atividades
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => navigate("/home/estatisticas")}>
                      <ChartColumn className="w-5 h-5" />
                      Estatísticas
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => navigate("/home/projetos")}>
                      <FolderOpen className="w-5 h-5" />
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
                      <User className="w-5 h-5" />
                      Usuário
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent side="top">
                    <DropdownMenuItem>
                      <User /> Conta
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Cog /> Configurações
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-red-500">
                      <LogOut /> Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 pl-10 pr-10 overflow-x-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ height: "100%", opacity: 0 }}
            >
              <Routes location={location}>
                <Route path="pomodoro" element={<Pomodoro />} />
                <Route path="semanal" element={<WeeklyPlanner />} />
                <Route path="projetos" element={<Projects />} />
                <Route path="/" element={<Navigate to="pomodoro" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </SidebarProvider>
  )
}
