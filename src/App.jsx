import { Routes, Route, Navigate } from "react-router-dom"
import HomeLayout from "@/layouts/HomeLayout/HomeLayout"
import Pomodoro from "@/pages/Pomodoro"
import WeeklyPlanner from "@/pages/WeeklyPlanner"
import Projects from "./pages/Projects"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home/pomodoro" />} />

      <Route path="/home" element={<HomeLayout />}>
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="semanal" element={<WeeklyPlanner />} />
        <Route path="projetos" element={<Projects />} />
      </Route>
    </Routes>
  )
}
