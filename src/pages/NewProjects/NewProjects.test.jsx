import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NewProjects from './index'

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('NewProjects Page', () => {
    it('renders the form correctly', () => {
        render(
            <MemoryRouter>
                <NewProjects />
            </MemoryRouter>
        )

        expect(screen.getByText('Novo Projeto')).toBeInTheDocument()
        expect(screen.getByText('Nome do Projeto')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Ex: Website Redesign')).toBeInTheDocument()
    })

    it('allows typing in the project name', () => {
        render(
            <MemoryRouter>
                <NewProjects />
            </MemoryRouter>
        )

        const input = screen.getByPlaceholderText('Ex: Website Redesign')
        fireEvent.change(input, { target: { value: 'My Awesome Project' } })

        expect(input.value).toBe('My Awesome Project')
    })

    it('navigates back when Cancel is clicked', () => {
        render(
            <MemoryRouter>
                <NewProjects />
            </MemoryRouter>
        )

        const cancelButton = screen.getByText('Cancelar')
        fireEvent.click(cancelButton)

        expect(mockNavigate).toHaveBeenCalledWith('/home/projetos')
    })
})
