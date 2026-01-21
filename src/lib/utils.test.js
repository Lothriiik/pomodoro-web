import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('Utils: cn', () => {
    it('should merge class names correctly', () => {
        const result = cn('bg-red-500', 'text-white')
        expect(result).toContain('bg-red-500')
        expect(result).toContain('text-white')
    })

    it('should handle conditional classes', () => {
        const isActive = true
        const result = cn('base-class', isActive && 'active-class', !isActive && 'hidden')
        expect(result).toContain('base-class')
        expect(result).toContain('active-class')
        expect(result).not.toContain('hidden')
    })

    it('should merge tailwind classes properly using tailwind-merge', () => {
        const result = cn('p-2', 'p-4')

        expect(result).toContain('p-4')
        expect(result).not.toContain('p-2')
    })
})
