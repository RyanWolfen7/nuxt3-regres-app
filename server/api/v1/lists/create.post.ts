import { ListItem } from "~/types"

export default defineEventHandler(async (event) => {
    const body = await readBody<ListItem>(event)
    const { name, color, year, pantoneValue } = body
    const userWithPassword = event.context.user
    if (!userWithPassword) return createError({
        statusCode: 204,
        message: 'Not Authorized to get this',
    })

    if (!name || !color || !year || !pantoneValue) {
        return createError({
            statusCode: 400,
            message: 'You need to fill out the form completely',
        })
    }

    //just noticed this doesnt have an endpoint in reqes
    return "Success"
})
