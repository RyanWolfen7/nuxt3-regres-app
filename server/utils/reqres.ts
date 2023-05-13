import axios from 'axios'
import { User, GetUserResponse } from '~~/types';

export async function filterUsers( key: string, value: any, pageNumber: number = 1) {
    const { data: response } = await axios.get<GetUserResponse>(`https://reqres.in/api/users?page=${pageNumber}`)
    const { data, page, total_pages: totalPages } = response;
    if (!data) return true;
    const existingUser = data.find((user: User ) => user[key] == value);
    if(existingUser) {
        return true;
    } else if (page !== totalPages) {
        filterUsers(value, pageNumber + 1);
    } else {
        return false;
    }
}
