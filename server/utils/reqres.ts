import axios from 'axios'
import { User, GetUserResponse } from '~~/types';

type FilterUsersReturnType = boolean | ((key: string, value: any, pageNumber?: number) => Promise<boolean>);

export async function filterUsers( key: string, value: any, pageNumber: number = 1): Promise<FilterUsersReturnType> {
    const { data: response } = await axios.get<GetUserResponse>(`https://reqres.in/api/users?page=${pageNumber}`)
    const { data, page, total_pages: totalPages } = response;
    let resValue: boolean | Function = false
    if (!data) return true;
    
    const existingUser = data.find((user: User ) => user[key] == value);
    if(existingUser) { return true }
    if (page !== totalPages) { resValue = await filterUsers(key, value, pageNumber + 1) }
    if (typeof resValue === 'function') { return resValue(key, value, pageNumber) }
    return resValue;
}
