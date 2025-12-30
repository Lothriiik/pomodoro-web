import { Check, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  { id: 1, title: "Análise de requisitos", time: "2h 30 m", completed: true },
  { id: 2, title: "Wireframes principais", time: "2h 30 m", completed: true },
  { id: 3, title: "Design system", time: "2h 30 m", completed: false },
  { id: 4, title: "Protótipo Interativo", time: "2h 30 m", completed: false },
  { id: 5, title: "Testes de usabilidade", time: "2h 30 m", completed: false },
];

export default function ListaTarefas() {
  return (
    <div className="bg-[#121418] border border-white/10 rounded-xl p-5 w-full max-w-md h-full flex flex-col">
      <h3 className="text-white font-bold text-lg mb-6">Tarefas</h3>

      <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between p-4 bg-[#1a1d24]/50 border border-white/5 rounded-xl hover:border-primaryPurple/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Custom Checkbox */}
              <div
                className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                  task.completed
                    ? "bg-green-500/20 border-green-500 text-green-500"
                    : "border-white/10 bg-transparent text-transparent"
                )}
              >
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>

              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-medium transition-all",
                    task.completed ? "text-gray-400 line-through" : "text-white"
                  )}
                >
                  {task.title}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {task.time}
                </span>
              </div>
            </div>

            <button className="text-gray-600 hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}