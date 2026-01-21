import { Routes, Route, Navigate } from "react-router-dom"
import HomeLayout from "@/layouts/HomeLayout/HomeLayout"
import Login from "@/pages/Login"
import Cadastro from "@/pages/Cadastro"
import { Toaster } from "sonner"

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors theme="dark" />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/home/*" element={<HomeLayout />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}