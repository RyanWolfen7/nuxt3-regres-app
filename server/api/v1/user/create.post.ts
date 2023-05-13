import { createUser, userExists } from "~/server/models/v1/users";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ username: string, email: string; password: string; rememberMe: boolean }>(event)
    const { username, email, password } = body
    
    if (!email || !password || !username) {
        return createError({
            statusCode: 400,
            message: 'User name, email address and password are required',
        })
    }
    const doesUserExist = await userExists(email)
    if ( doesUserExist ) { 
        return createError({
            statusCode: 400,
            message: 'This User Already Exists',
        }) 
    }

    const createdUser = await createUser({ username, email, password })
    if(createdUser.error) { 
        return createError({
            statusCode: 400,
            message: createdUser.error,
        })
    }
    const config = useRuntimeConfig()
    const session = serialize({ 
        userId: createdUser.id,
        token: createdUser.token
    })
    const signedSession = sign(session, config.cookieSecret)

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + config.cookieExpires),
    })
    return createdUser
})
