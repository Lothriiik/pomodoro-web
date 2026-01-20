import { Home, ArrowLeft} from "lucide-react"
import { useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  AlarmClock,
  ShieldAlert,
  LockKeyhole
} from "lucide-react"

export default function Unauthorized() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-primaryBackground flex items-center justify-center ">
      <div className="max-w-xl w-full text-center space-y-8">
        
        <div className="flex items-center justify-center flex-col gap-8">
          <LockKeyhole className="text-primaryPurple w-20 md:w-25 h-20 md:h-25"/>
          <h1 className="text-6xl md:text-[80px] md:text-white font-bold text-white/5 leading-none select-none">
            403
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Acesso não autorizado
          </h2>
          <p className="text-gray-400 text-md leading-relaxed">
            Parece que você está tentando acessar um módulo que <span className="text-white font-medium">não faz parte da sua autorização</span> atual.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/home/pomodoro")}
            size="padrao"
            variant="roxo"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para o Inicio
          </Button>
        </div>

   
        <div className="pt-12 flex items-center justify-center gap-2 text-gray-600 text-sm">
          <ShieldAlert className="w-3 h-3" />
          Erro 403 • Permissão Insuficiente
        </div>
      </div>
    </div>
  )
}