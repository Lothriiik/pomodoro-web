import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom";

export function ProjectCard({ 
  title, 
  description, 
  progress, 
  sessions, 
  totalTime, 
  tasks, 
  status, 
  date, 
  color 
}) {
  const colorMap = {
    purple: "bg-primaryPurple",
    blue: "bg-primaryBlue",
    orange: "bg-primaryOrange",
    green: "bg-primaryGreen",
    pink: "bg-primaryPink",
    red: "bg-primaryRed",
    yellow: "bg-primaryYellow",
  }

  return (
    <Link to="/home/detalhes-projetos" className="block h-full group">
      <div className="flex-1 w-full h-full border-white/15 rounded-lg border p-6 bg-primaryBackground flex flex-col gap-2 justify-between hover:border-primaryPurple/30 hover:bg-white/[0.02] transition-all cursor-pointer">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-white text-lg font-bold truncate transition-colors">
              {title}
            </h3>
            <div className={`w-3.5 h-3.5 rounded-full ${colorMap[color] || "bg-white"} shadow-[0_0_8px_rgba(255,255,255,0.1)]`} />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 h-10 mt-1 shrink-0">
            {description}
          </p>
        </div>

        <div className="space-y-3 tracking-tight truncate ">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300 font-medium">Progresso</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <Progress 
            value={progress}
            indicatorClassName={colorMap[color]}
            className="h-2" 
          />
        </div>

        <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider truncate w-full">Sessões</span>
            <span className="text-white text-base font-bold tracking-tight truncate w-full">{sessions}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider truncate w-full">Tempo</span>
            <span className="text-white text-base font-bold tracking-tight truncate w-full">{totalTime}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider truncate w-full">Tarefas</span>
            <span className="text-white text-sm font-bold tracking-tight truncate w-full">{tasks}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 tracking-tight truncate w-full">
          <Badge 
            variant="outline" 
            className="bg-zinc-800/50 border-white/10 text-gray-300 text-[10px] font-medium"
          >
            {status}
          </Badge>
          <span className="text-gray-500 text-[11px] font-medium">{date}</span>
        </div>
      </div>
    </Link>
  )
}