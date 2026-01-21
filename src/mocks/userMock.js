
export const USERS_MOCK = [
    {
        id: "1",
        name: "João Silva",
        email: "joao.silva@email.com",
        avatar: "",
        level: "Produtivo",
        memberSince: "Jan 2024",
        rank: "Top 5%",
        preferences: {
            pomodoroLength: 25,
            shortBreak: 5,
            longBreak: 15,
            dailyGoal: 8,
            weeklyGoal: 40,
            soundEnabled: true,
            notificationsEnabled: true,
            darkMode: true,
            autoStartBreaks: false,
            autoStartPomodoros: false,
        },
        stats: {
            totalPomodoros: 1284,
            totalHours: 534,
            longestStreak: 28,
            currentStreak: 14,
            tasksCompleted: 892,
            avgPomodorosPerDay: 12,
            avgFocusTime: 5.5,
            avgSessionLength: 45,
            bestDay: "Terça-feira",
            bestHour: "09:00 - 11:00",
            longestSession: 120,
            pomodorosThisWeek: 45,
            pomodorosThisMonth: 180,
            improvement: 12,
            perfectWeeks: 8,
            goalsAchieved: 156,
            projectsCompleted: 12,
            activeProjects: 3,
            totalBreaks: 342,
            breakTimeTotal: 84,
            canceledPomodoros: 12,
        },
        achievements: [
            { name: "Primeira Semana", description: "Completou 7 dias seguidos", unlocked: true },
            { name: "Maratonista", description: "100 pomodoros em um mês", unlocked: true },
            { name: "Focado", description: "500 pomodoros no total", unlocked: true },
            { name: "Mestre do Tempo", description: "1000 pomodoros no total", unlocked: true },
            { name: "Lenda", description: "5000 pomodoros no total", unlocked: false },
        ]
    }
];

export const CURRENT_USER_ID = "1";
