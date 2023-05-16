import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useListCalls } from '../useListCalls'
import { ListItem } from '~/types'
import axios from 'axios'
vi.mock("axios");

describe('useListCalls', () => {
    beforeEach(() => {
        vi.mock('../useListData', () => {
            const useListData = () => ({
                value: {
                    list: [] as ListItem[],
                    page: 1,
                    total_pages: 1,
                    statusCode: null,
                    message: ''
                }
            })
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

    it('should update listData and return updated data when calling queryLists', async () => {
        vi.mocked(axios, true).post.mockResolvedValueOnce({
            data: {
                list: [ { name: 'color', color: '#fff', year: 2000, pantone_value: 'idk'}],
                page: 1,
                total_pages: 2
            }
        });
        // Invoke the function under test
        const listCalls = await useListCalls()
        const result = await listCalls.queryLists(1)
        expect(result).toMatchObject({
            data: {
                list: [{ name: 'color', color: '#fff', year: 2000, pantone_value: 'idk'}],
                page: 1,
                total_pages: 2,
                statusCode: null,
                message: ''
            }
        })
    })
})
