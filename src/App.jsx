import { Routes, Route, Navigate } from "react-router-dom"
import HomeLayout from "@/layouts/HomeLayout/HomeLayout"
import Login from "@/pages/Login/index.jsx"
import Cadastro from "@/pages/Cadastro/index.jsx"
import { Toaster } from "sonner"

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors theme="dark" />

      <Routes>
        <Route path="/" element={<Navigate to="/home/pomodoro" />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/home/*" element={<HomeLayout />} />
      </Routes>
    </>
  )
}