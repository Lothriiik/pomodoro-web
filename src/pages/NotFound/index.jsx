import { useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  AlarmClock,
  ArrowLeft
} from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-primaryBackground flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-8">
        
        <div className="flex items-center justify-center flex-col gap-8">
          <AlarmClock className="text-primaryPurple w-20 md:w-25 h-20 md:h-25"/>
          <h1 className="text-6xl md:text-[80px] md:text-white font-bold text-white leading-none select-none">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Oops! Tempo Perdido
          </h2>
          <p className="text-gray-400 text-md leading-relaxed">
            Parece que essa página <span className="text-[#9D8BFF] font-medium">não existe no seu cronograma</span>. 
            Melhor voltarmos para o que importa.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/home/pomodoro")}
            size="xg"
            variant="roxo"
          >
            <ArrowLeft className="w-5 h-5" />
             Inicio
          </Button>
        </div>

   
        <div className="pt-10 flex items-center justify-center gap-2 text-gray-600 text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>Status: Link quebrado ou inexistente</span>
        </div>
      </div>
    </div>
  )
}