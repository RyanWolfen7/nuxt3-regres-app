import axios from 'axios'
import { User, GetUserResponse } from '~~/types';

var getUsers = async (pageNumber: number = 1) => {
    const { data } = await axios.get<GetUserResponse>(`https://reqres.in/api/users?page=${pageNumber}`)
    return data
} 

var getExistingUser = async (key: string, value: string, response: any): Promise<User | null> => {
    const { data, page, total_pages: totalPages } = await response;
    if (!data) return null
    const user = data.find((user: User) => user[key] == value)
    if (user) return user
    if (page !== totalPages) { return paginateUserResponse(key, value, page + 1) }
    return null
}

var paginateUserResponse = (key: string, value: string, page: number) => getExistingUser(key, value, getUsers(page)) 

export async function filterUsers(key: string, value: any): Promise<User | null> {
    return paginateUserResponse(key, value, 1)
}

// const returnUserBy = (user: User, returnType: keyof ReturnTypes & string) => {
//     const types: ReturnTypes = { default: user, boolean: false };
//     return types[returnType];
// };
