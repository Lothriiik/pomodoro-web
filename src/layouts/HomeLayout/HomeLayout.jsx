import React from "react"
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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
  SidebarTrigger,
  useSidebar,
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
import DetailsProjects from "@/pages/DetailsProjects"
import NotFound from "@/pages/NotFound"
import Unauthorized from "@/pages/Unauthorized"
import NewProjects from "@/pages/NewProjects"
import Dashboard from "@/pages/Dashboard"
import { UserProfileModal } from "@/components/UserProfileModal.jsx"
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

function LogoTrigger() {
  const { open, isMobile, openMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : open;

  return (
    <SidebarTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent"
      >
        <motion.img
          key={isOpen ? "open" : "closed"}
          src={isOpen ? "/ampulheta-roxa.png" : "/ampulheta-cinza.png"}
          alt="Logo"
          width={20}
          height={20}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
      </Button>
    </SidebarTrigger>
  );
}

import { PROJECTS_MOCK } from "@/mocks/projectsMock"

export default function HomeLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = React.useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)

  React.useEffect(() => {
    const path = location.pathname;
    let title = "Pomodoro";

    if (path.includes("/home/pomodoro")) title = "Pomodoro";
    else if (path.includes("/home/semanal")) title = "Calendário";
    else if (path.includes("/home/estatisticas")) title = "Dashboard";
    else if (path.includes("/home/novo-projeto")) title = "Novo Projeto";
    else if (path.includes("/home/projetos")) title = "Projetos";
    else if (path.includes("/home/detalhes-projeto")) {
      const id = path.split("/").pop();
      const project = PROJECTS_MOCK.find(p => p.id.toString() === id);
      title = project ? `Detalhes do Projeto - ${project.title}` : "Detalhes do Projeto";
    }

    document.title = title;
  }, [location]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-dvh w-full bg-primaryBackground flex-col md:flex-row">
        <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between px-4 border-b border-white/10 md:hidden bg-primaryBackground shrink-0">
          <div className="flex items-center gap-3 ml-4">
            <LogoTrigger />
          </div>
        </header>

        <Sidebar collapsible="icon">
          <SidebarHeader className="flex items-center justify-center p-2">
            <LogoTrigger />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/home/pomodoro")}
                      isActive={location.pathname === "/home/pomodoro"}
                      className={location.pathname === "/home/pomodoro" ? "text-primaryPurple" : ""}
                    >
                      <AlarmClock className="w-5 h-5" />
                      <span>Pomodoro</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/home/semanal")}
                      isActive={location.pathname === "/home/semanal"}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Calendário</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/home/estatisticas")}
                      isActive={location.pathname === "/home/estatisticas"}
                    >
                      <ChartColumn className="w-5 h-5" />
                      <span>Estatísticas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate("/home/projetos")}
                      isActive={location.pathname === "/home/projetos"}
                    >
                      <FolderOpen className="w-5 h-5" />
                      <span>Projetos</span>
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
                      <span>Usuário</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-48 bg-primaryBackground border-white/10 text-white">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
                      <Cog className="mr-2 h-4 w-4" /> Configurações
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => navigate("/login")}>
                      <LogOut className="mr-2 h-4 w-4" /> Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 px-10 md:px-12 pt-12 md:pt-0 overflow-x-hidden custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full"
            >
              <Routes location={location}>
                <Route path="pomodoro" element={<Pomodoro />} />
                <Route path="semanal" element={<WeeklyPlanner />} />
                <Route path="projetos" element={<Projects />} />
                <Route path="detalhes-projeto/:id" element={<DetailsProjects />} />
                <Route path="notfound" element={<Unauthorized />} />
                <Route path="novo-projeto" element={<NewProjects />} />
                <Route path="estatisticas" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="pomodoro" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <UserProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} />
      </div>
    </SidebarProvider>
  )
}