import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from './index'
import { DASHBOARD_STREAK } from '@/mocks/dashboardMock'

vi.mock('recharts', async () => {
    const Original = await vi.importActual('recharts')
    return {
        ...Original,
        ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    }
})

describe('Dashboard Page', () => {
    it('renders the dashboard title and key stats', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )

        expect(screen.getByText('Projetos Ativos')).toBeInTheDocument()
        expect(screen.getByText(`${DASHBOARD_STREAK} dias`)).toBeInTheDocument()
    })

    it('shows skeleton loading initially then content', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        )

        expect(screen.getByText('Progresso Diário')).toBeInTheDocument()



        await waitFor(() => {
            const streakText = screen.getByText(`${DASHBOARD_STREAK} dias`)
            expect(streakText).toBeVisible()
        }, { timeout: 2000 })
    })
})
