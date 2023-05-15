import axios from "axios"
import { ListItem, ListResponse } from "~/types"

export async function getLists(page: number = 1): Promise<ListResponse> {
    // add caching and context update later
    const { data } = await axios.get(`https://reqres.in/api/cosas?page=${page}`)
    return data 
}

export async function getListItemByIndex(index: number | undefined) {
    if(!index) return null
    // add caching and context update later
    const { data } = await axios.get(`https://reqres.in/api/cosas/${index}`)
    return data 
}

export async function updateListItem(listItem: ListItem) {
    if(!listItem.id) return null
    const { data } = await axios.put(`https://reqres.in/api/cosas/${listItem.id}`, listItem)
    return data 
}

export async function deleteListItem(id: number | undefined) {
    if(!id) return null
    const { data } = await axios.delete(`https://reqres.in/api/cosas/${id}`)
    return data 
}
