import { handleUserAuth, findUserByEmail } from '~~/server/models/v1/users'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event)
    const { email, password, rememberMe } = body

    if (!email || !password) {
        return createError({
            statusCode: 400,
            message: 'Email address and password are required',
        })
    }
    const userWithPassword = await handleUserAuth({email, password}, 'login')
    if (!userWithPassword) {
        return createError({
            statusCode: 401,
            message: 'Bad credentials',
        })
    }
    const user = await findUserByEmail(email)
    if(!user) {
        return createError({
            statusCode: 400,
            message: `Couldn't find user ${email}`,
        })
    }
    const tempPass = await hash(user.email) // using email because reqres doesnt return hashed passwords and we can still test both outcomes
    const verified = await verify(password, tempPass) 
    if (!verified) {
        return createError({
            statusCode: 401,
            message: 'Bad credentials',
        })
    }
    const config = useRuntimeConfig()
    const session = serialize({ userId: userWithPassword.id, token: userWithPassword.token })
    const signedSession = sign(session, config.cookieSecret)

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: rememberMe ? new Date(Date.now() + config.cookieRememberMeExpires) : new Date(Date.now() + config.cookieExpires),
    })

    return { ...user, password: tempPass, token: userWithPassword.token }
})
