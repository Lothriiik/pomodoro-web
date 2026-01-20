import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Timer,
  Clock,
  ClipboardList,
  Flame,
  CalendarCheck,
  TrendingUp
} from "lucide-react"
import { ActivityCalendar } from "@/components/common/ActivityCalendar"

const monthlyData = [
  { month: 'Jan', pomodoros: 45, horas: 34, tarefas: 28 },
  { month: 'Fev', pomodoros: 52, horas: 39, tarefas: 32 },
  { month: 'Mar', pomodoros: 48, horas: 36, tarefas: 30 },
  { month: 'Abr', pomodoros: 60, horas: 45, tarefas: 38 },
  { month: 'Mai', pomodoros: 55, horas: 41, tarefas: 35 },
  { month: 'Jun', pomodoros: 62, horas: 46, tarefas: 40 },
  { month: 'Jul', pomodoros: 58, horas: 43, tarefas: 37 },
  { month: 'Ago', pomodoros: 65, horas: 49, tarefas: 42 },
  { month: 'Set', pomodoros: 70, horas: 53, tarefas: 45 },
  { month: 'Out', pomodoros: 68, horas: 51, tarefas: 43 },
  { month: 'Nov', pomodoros: 72, horas: 54, tarefas: 46 },
  { month: 'Dez', pomodoros: 75, horas: 56, tarefas: 48 },
];

const weeklyFocusData = [
  { day: 'Seg', horas: 4.5 },
  { day: 'Ter', horas: 6.2 },
  { day: 'Qua', horas: 3.8 },
  { day: 'Qui', horas: 7.5 },
  { day: 'Sex', horas: 5.3 },
  { day: 'Sáb', horas: 2.1 },
  { day: 'Dom', horas: 0.5 },
];

const projectsData = [
  { name: 'Website Redesign', pomodoros: 24, progress: 65, color: '#9D8DF1' },
  { name: 'Mobile App', pomodoros: 18, progress: 45, color: '#B8CDF8' },
  { name: 'API Development', pomodoros: 16, progress: 80, color: '#F19D8D' },
  { name: 'Documentation', pomodoros: 12, progress: 30, color: '#8FAD88' },

];

const pieData = [
  { name: 'Website Redesign', value: 32, color: '#9D8DF1' },
  { name: 'Mobile App', value: 24, color: '#B8CDF8' },
  { name: 'API Development', value: 21, color: '#F19D8D' },
  { name: 'Documentation', value: 16, color: '#8FAD88' },
  { name: 'Outros', value: 7, color: '#71717a' },

];

const recentActivity = [
  { id: 1, task: 'Implementar autenticação', project: 'Website Redesign', pomodoros: 4, time: '2h atrás', color: '#9D8DF1' },
  { id: 2, task: 'Design do dashboard', project: 'Mobile App', pomodoros: 3, time: '4h atrás', color: '#B8CDF8' },
  { id: 3, task: 'Code review e testes', project: 'API Development', pomodoros: 2, time: '6h atrás', color: '#F19D8D' },
  { id: 4, task: 'Escrever documentação técnica', project: 'Documentation', pomodoros: 5, time: '1d atrás', color: '#8FAD88' },
];

const streak = 7;
const streakThresholds = [
  { limit: 2, color: "bg-primaryBlue" },
  { limit: 4, color: "bg-primaryGreen" },
  { limit: 6, color: "bg-primaryYellow" },
  { limit: 8, color: "bg-primaryOrange" },
];

const heatmapData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date(2025, 0, 1);
  date.setDate(date.getDate() + i);

  const intensity = Math.random();
  let hours = 0;
  if (intensity > 0.9) hours = (Math.random() * 4 + 6).toFixed(1);
  else if (intensity > 0.6) hours = (Math.random() * 3 + 3).toFixed(1);
  else if (intensity > 0.3) hours = (Math.random() * 2 + 1).toFixed(1);
  else if (intensity > 0.1) hours = (Math.random() * 1).toFixed(1);

  return {
    date: date,
    dateStr: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
    dayOfWeek: date.getDay(),
    hours: hours,
    intensity: intensity > 0.1 ? intensity : 0,
    pomodoros: Math.floor(hours * 2)
  };
});

const startDay = new Date(2025, 0, 1).getDay();
const emptyStartDays = Array.from({ length: startDay }).map(() => null);
const fullGridData = [...emptyStartDays, ...heatmapData];

const activeColor = streakThresholds.find(t => streak <= t.limit)?.color || "bg-primaryOrange";

export default function Dashboard() {

  const [timeRange, setTimeRange] = useState('hoje');

  const hourlyData = [
    { label: '06:00', pomodoros: 1, horas: 0.5, tarefas: 1 },
    { label: '08:00', pomodoros: 3, horas: 1.5, tarefas: 2 },
    { label: '10:00', pomodoros: 4, horas: 2.0, tarefas: 3 },
    { label: '12:00', pomodoros: 2, horas: 1.0, tarefas: 1 },
    { label: '14:00', pomodoros: 5, horas: 2.5, tarefas: 4 },
    { label: '16:00', pomodoros: 3, horas: 1.5, tarefas: 2 },
    { label: '18:00', pomodoros: 2, horas: 1.0, tarefas: 1 },
    { label: '20:00', pomodoros: 1, horas: 0.5, tarefas: 1 },
  ];

  const weeklyData = [
    { label: 'Seg', pomodoros: 8, horas: 4.5, tarefas: 6 },
    { label: 'Ter', pomodoros: 12, horas: 6.2, tarefas: 8 },
    { label: 'Qua', pomodoros: 7, horas: 3.8, tarefas: 5 },
    { label: 'Qui', pomodoros: 15, horas: 7.5, tarefas: 10 },
    { label: 'Sex', pomodoros: 10, horas: 5.3, tarefas: 7 },
    { label: 'Sáb', pomodoros: 4, horas: 2.1, tarefas: 3 },
    { label: 'Dom', pomodoros: 1, horas: 0.5, tarefas: 1 },
  ];

  const monthDailyData = Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    pomodoros: Math.floor(Math.random() * 10) + 2,
    horas: (Math.random() * 5 + 1).toFixed(1),
    tarefas: Math.floor(Math.random() * 8) + 1,
  }));

  const getMetrics = () => {
    switch (timeRange) {
      case 'semana':
        return {
          pomodoros: '45/50',
          focusTime: '24h 15m',
          tasks: '38/45',
          pomodorosLabel: 'Pomodoros na Semana',
          focusTimeLabel: 'Tempo de Foco Semanal',
          tasksLabel: 'Tarefas na Semana',
          chartTitle1: 'Progresso Semanal',
          chartTitle2: 'Foco Diário',
          chartData1: weeklyData,
          chartData2: weeklyData
        };
      case 'mês':
        return {
          pomodoros: '180/200',
          focusTime: '96h 30m',
          tasks: '145/160',
          pomodorosLabel: 'Pomodoros no Mês',
          focusTimeLabel: 'Tempo de Foco Mensal',
          tasksLabel: 'Tarefas no Mês',
          chartTitle1: 'Progresso Mensal',
          chartTitle2: 'Foco Mensal',
          chartData1: monthDailyData,
          chartData2: monthDailyData
        };
      default: 
        return {
          pomodoros: '12/16',
          focusTime: '4h 25m',
          tasks: '8/12',
          pomodorosLabel: 'Pomodoros Hoje',
          focusTimeLabel: 'Tempo de Foco Hoje',
          tasksLabel: 'Tarefas Hoje',
          chartTitle1: 'Progresso Diário',
          chartTitle2: 'Foco por Horário',
          chartData1: hourlyData,
          chartData2: hourlyData
        };
    }
  };

  const metrics = getMetrics();

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto gap-8 md:gap-12 ">
      <header className="mt-8 sm:mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
        <div className='flex-1 min-w-0'>
          <h1 className='text-white text-xl sm:text-2xl font-bold tracking-tight truncate'>Dashboard</h1>
          <p className="text-gray-300 text-xs sm:text-sm tracking-tight ">Acompanhe seu progresso e produtividade</p>
        </div>

        <div className="p-1 rounded-lg flex items-center gap-1 border border-white/10 self-start md:self-auto">
          {['Hoje', 'Semana', 'Mês'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range.toLowerCase())}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                timeRange === range.toLowerCase()
                  ? "text-white bg-primaryPurple  shadow-sm border border-white/5"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </header>
      <div className="flex-1 gap-4 md:gap-8 flex flex-col">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 ">
          <div className="flex border-white/15 rounded-lg border p-3 sm:p-5 items-center gap-1 md:gap-0 flex-col justify-between">
            <div className="ml-0 md:ml-6 md:mr-6  truncate w-full flex flex-col gap-3 ">
              <div className='flex justify-between'>
                <p className="text-white text-base md:text-xl  font-bold truncate w-full">{metrics.pomodoros}</p>
                <CalendarCheck className="w-4.5 h-4.5 text-gray-300" />
              </div>
              <Progress value={75} indicatorClassName="bg-primaryPurple" className="w-full h-1 md:h-1.5" />
            </div>
            <div className="ml-0 md:ml-6 md:mr-6 tracking-tight truncate w-full">
              <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">{metrics.pomodorosLabel}</p>
            </div>
          </div>
          <div className="flex border-white/15 rounded-lg border p-3 sm:p-5 items-center gap-1 md:gap-0 flex-col justify-between">
            <div className="ml-0 md:ml-6 md:mr-6 truncate w-full flex flex-col gap-1">
              <div className="flex justify-between">
                <p className="text-white text-base md:text-xl font-bold truncate w-full">{metrics.focusTime}</p>
                <Timer className="w-4.5 h-4.5 text-gray-300" />
              </div>
              <Badge variant="outline" className="bg-primaryBackground w-15 rounded-3xl border-white/10 gap-1 text-green-500 text-[8px] md:text-[10px] font-medium px-2 py-0.5">
                <TrendingUp className="w-3 h-3 " />
                +12%
              </Badge>
            </div>
            <div className="ml-0 md:ml-6 md:mr-6 tracking-tight truncate w-full">
              <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">{metrics.focusTimeLabel}</p>
            </div>
          </div>
          <div className="flex border-white/15 rounded-lg border p-3 sm:p-5 items-center gap-1 md:gap-0 flex-col justify-between">
            <div className="ml-0 md:ml-6 md:mr-6  truncate w-full flex flex-col gap-3 ">
              <div className="flex justify-between">
                <p className="text-white text-base md:text-xl  font-bold truncate w-full">{metrics.tasks}</p>
                <ClipboardList className="w-4.5 h-4.5 text-gray-300" />
              </div>
              <Progress value={75} indicatorClassName="bg-primaryPurple" className="w-full h-1 md:h-1.5" />
            </div>
            <div className="ml-0 md:ml-6 md:mr-6 tracking-tight truncate w-full">
              <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">{metrics.tasksLabel}</p>
            </div>
          </div>
          <div className="flex border-white/15 rounded-lg border p-3 sm:p-5 items-center gap-1 md:gap-0 flex-col justify-between">
            <div className="ml-0 md:ml-6 md:mr-6  truncate w-full flex flex-col gap-2 ">
              <div className="flex justify-between">
                <p className="text-white text-base md:text-xl  font-bold truncate w-full">{streak} dias</p>
                <Flame className={`w-4.5 h-4.5 ${activeColor.replace("bg-", "text-")}`} />
              </div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => {
                  return (
                    <div
                      key={i}
                      className={`h-3.5 w-3.5 rounded-sm ${i < streak ? activeColor : 'bg-white/10'}`}
                    />
                  );
                })}
              </div>
            </div>
            <div className="ml-0 md:ml-6 md:mr-6 tracking-tight truncate w-full">
              <p className="text-gray-300 text-xs md:text-sm tracking-tight truncate w-full">Sequência Atual</p>
            </div>
          </div>
        </div>


        <div className="flex-1 flex flex-col md:flex-row h-[300px] md:h-80 min-h-0 md:flex-none w-full relative gap-4 md:gap-8">
          <div className='border-white/10 rounded-xl border p-5 w-full md:w-[50%] flex flex-col h-[300px] md:h-full  '>
            <h3 className="text-white font-medium mb-1">{metrics.chartTitle1}</h3>
            <p className="text-gray-400 text-xs mb-4">Evolução de pomodoros, tempo de foco e tarefas</p>
            <div className="w-full h-full px-2 ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.chartData1} margin={{ left: -30, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" shapeRendering="crispEdges" stroke="#ffffff10" />
                  <XAxis dataKey="label" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#14171B', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="pomodoros" stroke="#9D8DF1" strokeWidth={2} />
                  <Line type="monotone" dataKey="horas" stroke="#B8CDF8" strokeWidth={2} />
                  <Line type="monotone" dataKey="tarefas" stroke="#8FAD88" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className='border-white/10 rounded-xl border p-5 w-full md:w-[50%] flex flex-col h-[300px] md:h-full  '>
            <h3 className="text-white font-medium mb-1">{metrics.chartTitle2}</h3>
            <p className="text-gray-400 text-xs mb-4">Horas de foco distribuídas</p>
            <div className="w-full h-full  px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.chartData2} margin={{ left: -30, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="label" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#14171B', border: '1px solid #ffffff20', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="horas" fill="#9D8DF1" barSize={timeRange === 'mês' ? 5 : 50} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 border-white/10 rounded-xl h-85 md:h-74 border p-6 w-full overflow-hidden">
          <ActivityCalendar />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6 justify-between">
          <div className='w-full md:w-[65%] border-white/10 rounded-xl border p-6 flex flex-col'>
            <div className="mb-6">
              <h3 className="text-white font-medium mb-1">Projetos Ativos</h3>
              <p className="text-gray-400 text-xs">Distribuição de tempo e progresso por projeto</p>
            </div>

            <div className="flex flex-col gap-6 flex-1">
              {projectsData.map((project) => (
                <div key={project.name} className="flex flex-col gap-2">
                  <div className="flex justify-between md:items-center text-sm flex-col md:flex-row">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.color }}></div>
                      <span className="text-white font-medium">{project.name}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-xs font-medium">
                      <span className="text-gray-400">{project.pomodoros} pomodoros</span>
                      <span className="text-white font-bold">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='w-full md:w-[33%] border-white/10 rounded-xl border p-6 flex flex-col'>
            <div className="mb-2">
              <h3 className="text-white font-medium mb-1">Distribuição por Projeto</h3>
              <p className="text-gray-400 text-xs">Tempo investido em cada projeto</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center min-h-[220px]">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#14171B', border: '1px solid #ffffff20', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {pieData.slice(0, 4).map((entry) => (
                <div key={entry.name} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-400 font-medium">{entry.name}</span>
                  <span className="text-white font-bold">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 border-white/10 rounded-xl border p-6 mb-8 w-full overflow-hidden flex flex-col h-auto">
          <div className="mb-6">
            <h3 className="text-white font-medium mb-1">Atividade Recente</h3>
            <p className="text-gray-400 text-xs">Últimas tarefas e sessões de foco</p>
          </div>

          <div className="flex flex-col flex-1 justify-center">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 last:pb-0 first:pt-0">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activity.color }}></div>
                    <h4 className="text-white text-sm font-medium">{activity.task}</h4>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{activity.project}</p>
                </div>

                <div className="flex items-end flex-col md:flex-row">
                  <span className="text-white text-xs font-bold">{activity.pomodoros}</span>
                  <p className="text-white ml-1 text-xs font-bold hidden md:block">pomodoros</p>
                  <span className="text-gray-500 ml-2 text-xs min-w-[60px] text-right">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

