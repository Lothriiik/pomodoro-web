export const DASHBOARD_MONTHLY_DATA = [
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

export const DASHBOARD_WEEKLY_FOCUS_DATA = [
    { day: 'Seg', horas: 4.5 },
    { day: 'Ter', horas: 6.2 },
    { day: 'Qua', horas: 3.8 },
    { day: 'Qui', horas: 7.5 },
    { day: 'Sex', horas: 5.3 },
    { day: 'Sáb', horas: 2.1 },
    { day: 'Dom', horas: 0.5 },
];

export const DASHBOARD_PROJECTS_DATA = [
    { name: 'Website Redesign', pomodoros: 24, progress: 65, color: '#9D8DF1' },
    { name: 'Mobile App', pomodoros: 18, progress: 45, color: '#B8CDF8' },
    { name: 'API Development', pomodoros: 16, progress: 80, color: '#F19D8D' },
    { name: 'Documentation', pomodoros: 12, progress: 30, color: '#8FAD88' },

];

export const DASHBOARD_PIE_DATA = [
    { name: 'Website Redesign', value: 32, color: '#9D8DF1' },
    { name: 'Mobile App', value: 24, color: '#B8CDF8' },
    { name: 'API Development', value: 21, color: '#F19D8D' },
    { name: 'Documentation', value: 16, color: '#8FAD88' },
    { name: 'Outros', value: 7, color: '#71717a' },

];

export const DASHBOARD_RECENT_ACTIVITY = [
    { id: 1, task: 'Implementar autenticação', project: 'Website Redesign', pomodoros: 4, time: '2h atrás', color: '#9D8DF1' },
    { id: 2, task: 'Design do dashboard', project: 'Mobile App', pomodoros: 3, time: '4h atrás', color: '#B8CDF8' },
    { id: 3, task: 'Code review e testes', project: 'API Development', pomodoros: 2, time: '6h atrás', color: '#F19D8D' },
    { id: 4, task: 'Escrever documentação técnica', project: 'Documentation', pomodoros: 5, time: '1d atrás', color: '#8FAD88' },
];

export const DASHBOARD_STREAK = 7;

export const DASHBOARD_STREAK_THRESHOLDS = [
    { limit: 2, color: "bg-primaryBlue" },
    { limit: 4, color: "bg-primaryGreen" },
    { limit: 6, color: "bg-primaryYellow" },
    { limit: 8, color: "bg-primaryOrange" },
];

// Helper for random data generation (kept here to ensure consistent mock values if we wanted to seed it, 
// but for now we keep the generation logic as it was in the component, just abstracted)
export const DASHBOARD_HEATMAP_DATA = Array.from({ length: 365 }).map((_, i) => {
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

export const DASHBOARD_HOURLY_DATA = [
    { label: '06:00', pomodoros: 1, horas: 0.5, tarefas: 1 },
    { label: '08:00', pomodoros: 3, horas: 1.5, tarefas: 2 },
    { label: '10:00', pomodoros: 4, horas: 2.0, tarefas: 3 },
    { label: '12:00', pomodoros: 2, horas: 1.0, tarefas: 1 },
    { label: '14:00', pomodoros: 5, horas: 2.5, tarefas: 4 },
    { label: '16:00', pomodoros: 3, horas: 1.5, tarefas: 2 },
    { label: '18:00', pomodoros: 2, horas: 1.0, tarefas: 1 },
    { label: '20:00', pomodoros: 1, horas: 0.5, tarefas: 1 },
];

export const DASHBOARD_WEEKLY_DATA = [
    { label: 'Seg', pomodoros: 8, horas: 4.5, tarefas: 6 },
    { label: 'Ter', pomodoros: 12, horas: 6.2, tarefas: 8 },
    { label: 'Qua', pomodoros: 7, horas: 3.8, tarefas: 5 },
    { label: 'Qui', pomodoros: 15, horas: 7.5, tarefas: 10 },
    { label: 'Sex', pomodoros: 10, horas: 5.3, tarefas: 7 },
    { label: 'Sáb', pomodoros: 4, horas: 2.1, tarefas: 3 },
    { label: 'Dom', pomodoros: 1, horas: 0.5, tarefas: 1 },
];

export const DASHBOARD_MONTH_DAILY_DATA = Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    pomodoros: Math.floor(Math.random() * 10) + 2,
    horas: (Math.random() * 5 + 1).toFixed(1),
    tarefas: Math.floor(Math.random() * 8) + 1,
}));
