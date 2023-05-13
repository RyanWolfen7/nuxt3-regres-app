import axios from 'axios'
import { hash } from '~/server/utils/password'
import { filterUsers } from "~/server/utils/reqres"
import { User } from "~/types"

const defaultHeaders = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}

export async function findUserByEmail(email: string, returnType: string = "default") {
    const user = filterUsers("email", email, returnType)
    return user
}

export async function handleUserAuth(user: User, type: string) {
    try {
        const hashedPassword = await hash(user.password)
        const encryptedUser = Object.assign({}, user, { password: hashedPassword });
        const { data: response} = await axios.post(`https://reqres.in/api/${type}`, encryptedUser, defaultHeaders)
        return response
    } catch (error) {
        return error
    }
}
