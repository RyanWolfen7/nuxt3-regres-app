import { getLists } from "~/server/models/v1/lists"
import { ListItem } from "~/types"

export default defineEventHandler(async (event) => {
    const body = await readBody<{page: number}>(event)
    const { page } = body
    const userWithPassword = event.context.user
    if (!userWithPassword) return createError({
        statusCode: 204,
        message: 'Not Authorized to get this',
    })
    const response = await getLists(page)
    return response
})
