import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useListCalls } from '../useListCalls'

describe('useListCalls', () => {
    beforeEach(() => {    
        vi.mock('../useListData', () => {
            const useListData = vi.fn(() => {})
            return { useListData }
        })
        
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should return the correct functions', () => {
        // Invoke the function under test
        const result = useListCalls()

        // Expectations
        expect(result.createListItem).toBeInstanceOf(Function)
        expect(result.queryLists).toBeInstanceOf(Function)
        expect(result.updateListItem).toBeInstanceOf(Function)
        expect(result.deleteListItem).toBeInstanceOf(Function)
    })
})
