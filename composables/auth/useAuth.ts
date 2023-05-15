import { User } from '~/types'
import { useAuthUser } from './useAuthUser'
import axios from 'axios'

export const useAuth = () => {
    const authUser = useAuthUser()

    const setUser = (user: User) => {
        authUser.value = user
    }

    const setCookie = (cookie: any) => {
        cookie.value = cookie
    }

    const login = async (
        email: string,
        password: string,
        rememberMe: boolean,
    ) => {
        const { data: response } = await axios.post('/v1/auth/login', { email, password, rememberMe })
        setUser(response)

        return authUser
    }

    const logout = async () => {
        const { data: response } = await axios.post('/v1/auth/logout')
        setUser(response)
        return true
    }

    const me = async () => {
        if (!authUser.value) {
            try {
                const { data: response } = await axios.get('/v1/auth/me', {
                    headers: useRequestHeaders(['cookie'])
                })
                setUser(response)
            }
            catch (error) {
                setCookie({})
            }
        }

        return authUser
    }

    return {
        login,
        logout,
        me
    }
}
