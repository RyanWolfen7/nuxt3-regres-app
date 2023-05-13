import axios from 'axios'
import { hash } from '~/server/utils/password'
import { filterUsers } from "~/server/utils/reqres"
import { User } from "~/types"

export async function userExists(email: string) {
    const exists = filterUsers("email", email)
    return exists
}

export async function createUser(user: User) {
    try {
        const hashedPassword = await hash(user.password)
        const encryptedUser = Object.assign({}, user, { password: hashedPassword });
        const { data: response} = await axios.post(`https://reqres.in/api/register`, encryptedUser, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        return error
    }
}
