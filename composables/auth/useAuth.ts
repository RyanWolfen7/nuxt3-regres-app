import { User } from '~/types'
import { useAuthUser } from './useAuthUser'
import axios from 'axios'

export const useAuth = () => {
    const authUser = useAuthUser()

    const setUser = (user: User) => {
        authUser.value = user
    }

    const login = async (
        email: string,
        password: string,
        rememberMe: boolean,
    ) => {
        const { data: response } = await axios.post('/api/v1/user/login', { email, password, rememberMe })
        const { data, error } = await useFetch('/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe })
        })
        setUser(response)

        return authUser
    }

    return {
        login
    }
}

// { 
    // const { data, error } = await useFetch('/api/v1/user/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(this.form)
    // })
//     if (error.value) {
//         const { message, statusCode } = error.value?.data
//         alert(message)
//     }
//     if(data.value) {
//         console.log(data.value)
//         alert(data.value);
//     } 
// }
