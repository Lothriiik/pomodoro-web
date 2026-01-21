import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export function ProjectCard({
  id, title, description, progress, sessions, totalTime, tasks, status, date, endDate, color
}) {
  const colorMap = {
    purple: "bg-primaryPurple",
    blue: "bg-primaryBlue",
    orange: "bg-primaryOrange",
    green: "bg-primaryGreen",
    pink: "bg-primaryPink",
    red: "bg-primaryRed",
    yellow: "bg-primaryYellow",
  };

  return (
    <Link to={`/home/detalhes-projeto/${id}`} className="block w-full h-full group">
      <div className="flex flex-row md:flex-col w-full h-full border-white/15 rounded-lg border p-4 sm:p-5 lg:p-6 bg-primaryBackground gap-4 md:gap-3 justify-between hover:border-primaryPurple hover:bg-white/[0.02] transition-all cursor-pointer">

        <div className="flex flex-col flex-1 min-w-0 md:flex-none">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-white text-sm md:text-base lg:text-lg font-bold truncate transition-colors flex-1">{title}</h3>
            <div className={`hidden md:block w-3 h-3 flex-shrink-0 rounded-full ${colorMap[color] || "bg-white"} shadow-[0_0_8px_rgba(255,255,255,0.1)] mt-1`} />
          </div>

          <p className="hidden md:block text-gray-400 text-xs md:text-sm mt-1 leading-snug line-clamp-3 h-[3.5rem] overflow-hidden">
            {description}
          </p>

          <div className="mt-2 md:mt-4 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] md:text-sm">
              <span className="text-gray-300 font-medium">Progresso</span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
            <Progress value={progress} indicatorClassName={colorMap[color]} className="w-full h-1 md:h-1.5" />
          </div>
        </div>

        <div className="flex flex-col md:w-full justify-between items-end md:items-stretch gap-3">
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 border-b-0 md:border-b border-white/5 pb-0 md:pb-4 w-full">
            <StatItem label="Sessões" value={sessions} />
            <StatItem label="Tempo" value={totalTime} />
            <StatItem label="Tarefas" value={Array.isArray(tasks) ? `${tasks.filter(t => t.completed).length}/${tasks.length}` : tasks} />
          </div>

          <div className="flex  md:flex-row justify-between items-center md:items-center gap-2 w-full">
            <div className="order-2 md:order-1 w-full md:w-auto flex justify-end md:justify-start">
              <Badge variant="outline" className="bg-zinc-800/50 border-white/10 text-gray-300 text-[8px] md:text-[10px] font-medium px-2 py-0.5">
                {status}
              </Badge>
            </div>
            <span className="text-gray-500 text-[9px] md:text-[11px] font-medium order-1 md:order-2">{date || endDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function StatItem({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col items-end md:items-start min-w-0 ${className}`}>
      <span className="text-gray-500 text-[8px] md:text-[10px] uppercase font-bold tracking-wider">{label}</span>
      <span className="text-white text-xs md:text-base font-bold truncate">{value}</span>
    </div>
  );
}