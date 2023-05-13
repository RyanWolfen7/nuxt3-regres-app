import { userExists } from "~/server/models/v1/users";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ username: string, email: string; password: string; rememberMe: boolean }>(event)
    const { username, email, password, rememberMe } = body
    
    if (!email || !password) {
        return createError({
            statusCode: 400,
            message: 'Email address and password are required',
        })
    }
    const doesUserExist = await userExists(email)
    if ( doesUserExist ) {
        return doesUserExist
    }

})
