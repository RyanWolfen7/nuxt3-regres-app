import axios from "axios"
import { ListItem } from "~/types"

export async function getLists(page: number = 1) {
    // add caching and context update later
    const response = await axios.get<any>(`https://reqres.in/api/cosas?page=${page}`)
    return response
}

export async function getListItemByIndex(index: number | undefined) {
    if(!index) return null
    // add caching and context update later
    const response = await axios.get<any>(`https://reqres.in/api/cosas/${index}`)
    return response
}

export async function updateListItem(listItem: ListItem) {
    if(!listItem.id) return null
    const response = await axios.put<any>(`https://reqres.in/api/cosas/${listItem.id}`, listItem)
    return response
}

export async function deleteListItem(id: number | undefined) {
    if(!id) return null
    const response = await axios.delete<any>(`https://reqres.in/api/cosas/${id}`)
    return response
}
