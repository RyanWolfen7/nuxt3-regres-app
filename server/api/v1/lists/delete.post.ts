import { deleteListItem } from "~/server/models/v1/lists"

export default defineEventHandler(async (event) => {
    const { id } = await readBody<{id: number}>(event)
    const userWithPassword = event.context.user
    if (!userWithPassword) return createError({
        statusCode: 204,
        message: 'Not Authorized to get this',
    })
    const response = await deleteListItem(id)
    return response
})
