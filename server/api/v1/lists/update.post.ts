import { getListItemByIndex, updateListItem } from "~/server/models/v1/lists"
import { ListItem } from "~/types"

export default defineEventHandler(async (event) => {
    const body = await readBody<ListItem>(event)
    const { name, id, color, pantoneValue, year } = body
    const userWithPassword = event.context.user
    if (!userWithPassword) return createError({
        statusCode: 204,
        message: 'Not Authorized to get this',
    })
    const listItem = await getListItemByIndex(id)
    if (!listItem) return createError({
        statusCode: 201,
        message: `Something Went wrong could not update item: ${id}`,
    })
    const updatedListItem = await updateListItem(body)
    if (!updatedListItem) return createError({
        statusCode: 201,
        message: `Something Went wrong could not update item: ${id}`,
    })
    return updatedListItem
})
