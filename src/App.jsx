import { Routes, Route, Navigate } from "react-router-dom"
import HomeLayout from "@/layouts/HomeLayout/HomeLayout"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home/pomodoro" />} />

      <Route path="/home/*" element={<HomeLayout />} />
    </Routes>
  )
}
