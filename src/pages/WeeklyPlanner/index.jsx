import { useState } from 'react';
import { ActivityCard, ActivityCardReduced } from '../../components/ActivityCard';

const MOCK_DATA = {
  seg: [{ id: 1, time: "08:00", title: "Estudar React", tag: "Estudos", cycles: 2, color: "pink" }],
  ter: [
    { id: 2, time: "09:00", title: "Daily", tag: "Work", cycles: 1, color: "orange" },
    { id: 3, time: "14:00", title: "Refatorar", tag: "Work", cycles: 3, color: "blue" },
    { id: 7, time: "14:00", title: "Wireframes Homepage", tag: "Work", cycles: 3, color: "blue" }
  ],
  qua: [{ id: 4, time: "10:00", title: "Academia", tag: "Saúde", cycles: 2, color: "green" }],
  qui: [{ id: 5, time: "08:00", title: "Hooks", tag: "Estudos", cycles: 2, color: "purple" }],
  sex: [{ id: 6, time: "19:00", title: "Projeto Pomodoro", tag: "Freelance", cycles: 4, color: "orange" }],
  sab: [{ id: 8, time: "19:00", title: "Implementar Auth", tag: "App Mobile", cycles: 4, color: "red" }],
  dom: []
};

export default function WeeklyPlanner() {
  const getWeekDays = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const monday = new Date(now.setDate(diffToMonday));
    const days = [];
    const labels = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    const fullLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      days.push({
        key: labels[i],
        label: fullLabels[i],
        displayDate: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                     .replace(' de ', ' ') 
                     .replace('.', ''),
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    return days;
  };

  const weekDays = getWeekDays();
  const todayKey = weekDays.find(d => d.isToday)?.key || "seg";
  const [selectedDay, setSelectedDay] = useState(todayKey);

  return (
    <div className="flex flex-col h-screen gap-6">
      <header className="h-[15vh] pt-10 pb-8">
        <h1 className='text-white text-2xl font-bold'>Planejamento Semanal</h1>
        <div className="text-gray-300 text-sm">Gerencie seus projetos e acompanhe o progresso</div>
      </header>
      
      <div className="flex flex-row justify-between h-[50vh] w-full">
        {weekDays.map((day) => {
          const isSelected = selectedDay === day.key;
          const activities = MOCK_DATA[day.key] || [];

          return (
            <div 
              key={day.key} 
              onClick={() => setSelectedDay(day.key)}
              className={`flex flex-col border rounded-lg p-2 items-center w-40 h-auto cursor-pointer transition-all ${
                isSelected 
                  ? "border-primaryPurple ring-1 ring-primaryPurple/20" 
                  : "border-white/15 hover:border-white/30"
              }`}
            >
              <div className='h-[10vh] flex flex-col justify-center items-center w-full'>
                <h3 className={`text-sm ${isSelected ? "text-primaryPurple" : "text-gray-400"}`}>
                  {day.label}
                </h3>
                <h1 className={`text-md ${isSelected ? "text-primaryPurple font-bold" : "text-white"}`}>
                  {day.displayDate}
                </h1>
                <div className="h-2 mt-1 flex items-center justify-center">
                  {day.isToday && <div className="w-1.5 h-1.5 bg-primaryPurple rounded-full"></div>}
                </div>
              </div>
              
              <div className="activities-list overflow-y-auto w-full flex flex-col justify-center items-center">
                {activities.map((act) => (
                  activities.length > 2 ? (
                    <ActivityCardReduced 
                      key={act.id}
                      time={act.time}
                      title={act.title}
                      cycles={act.cycles}
                      color={act.color}
                    />
                  ) : (
                    <ActivityCard 
                      key={act.id}
                      time={act.time}
                      title={act.title}
                      tag={act.tag}
                      cycles={act.cycles}
                      color={act.color}
                    />
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className='flex flex-row w-full h-[20vh] justify-between'>
        <div className="h-full w-[30vw] border-white/15 rounded-lg border p-4">
          <h3 className="text-white">Agendar Tarefa para {weekDays.find(d => d.key === selectedDay)?.label}</h3>
        </div>

        <div className="h-full w-[60vw] border-white/15 rounded-lg border p-4">
          <h3 className="text-white">Resumo da Semana</h3>
        </div>
      </div>
    </div>
  );
}