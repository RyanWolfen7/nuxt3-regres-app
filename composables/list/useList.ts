import { ListItem } from '~/types'
import axios from 'axios'

export const useList = () => {
    const authUser = useAuthUser()

    const createListItem = async (listItem: ListItem) => {
        const { data: response } = await axios.post('/api/v1/lists/create', listItem)
        return response
    }

    const queryLists = async(page: number) => {
        const { data: response } = await axios.post('/api/v1/lists/get', page)
        return response
    }

    const updateListItem = async (listItem: ListItem) => {
        const { data: response } = await axios.post('/api/v1/lists/update', listItem)
        return response
    }

    const deleteListItem = async (id: number) => {
        const { data: response } = await axios.post('/api/v1/lists/delete', id)
        return response
    }

    return {
        createListItem,
        queryLists,
        updateListItem,
        deleteListItem
    }
}
