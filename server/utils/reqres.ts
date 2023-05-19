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
    if (page !== totalPages) { return filterUsers(key, value, page + 1) }
    return null
}

var composeUserPagination = (getExistingUser: any, getUsers: any) => async (key: string, value: string, page: number = 1) => await getExistingUser(key, value, getUsers(page)) 

export const filterUsers = composeUserPagination(getExistingUser, getUsers)


// const returnUserBy = (user: User, returnType: keyof ReturnTypes & string) => {
//     const types: ReturnTypes = { default: user, boolean: false };
//     return types[returnType];
// };

// const composeUsers = (f1: any, f2: any) => async (key: string, value: string, page: number) => await f1(key, value, await f2(page))
