import axios from 'axios'
import { User, GetUserResponse, ReturnTypes } from '~~/types';

const getUsers = async (pageNumber: number) => {
    const { data } = await axios.get<GetUserResponse>(`https://reqres.in/api/users?page=${pageNumber}`)
    return data
}

const getExistingUser = async (key: string, value: string, response: any): Promise<User | null> => {
    const { data, page, total_pages: totalPages } = await response;
    if (!data) return null
    const user = data.find((user: User) => user[key] == value)
    if (user) return user
    if (page !== totalPages) { return getExistingUser(key, value, getUsers(page + 1)) }
    return null
}

export async function filterUsers(key: string, value: any, pageNumber: number = 1): Promise<User | null> {
    const usersData = await getUsers(pageNumber)
    const existingUser = await getExistingUser(key, value, usersData)
    return existingUser;
}

// const returnUserBy = (user: User, returnType: keyof ReturnTypes & string) => {
//     const types: ReturnTypes = { default: user, boolean: false };
//     return types[returnType];
// };
