import axios from 'axios'
import { User, GetUserResponse } from '~~/types';

/**
 * Retrieves a list of users from a remote server and filters them based on the given key/value pair.
 * It is dynamic because I had two functions with almost the exact same code. Currently it can return the filter as true or false or return the user
 *
 * @param {string} key The key to filter the users on.
 * @param {any} value The value to match for the given key.
 * @param {string} returnType The type of data to return, either "boolean" or "default". Default is an object of type User[].
 * @param {number} pageNumber The current page number to retrieve from the remote server. Defaults to 1.
 * @returns {Promise<boolean | User[] | any>} A Promise containing either a boolean, an  User object, or any data type, depending on the returnType parameter.
 */

export async function filterUsers( key: string, value: any, returnType: string, pageNumber: number = 1): Promise<boolean | User | any> {
    const isReturnBool = returnType === "boolean"
    const { data: response } = await axios.get<GetUserResponse>(`https://reqres.in/api/users?page=${pageNumber}`)
    const { data, page, total_pages: totalPages } = response;
    let resValue: any = isReturnBool ? false : {}
    if (!data) return isReturnBool ? true : resValue;

    const existingUser = data.find((user: User ) => user[key] == value);
    if(existingUser) { return isReturnBool ? true : existingUser}
    if (page !== totalPages) { resValue = await filterUsers(key, value, returnType, pageNumber + 1) }
    return resValue;
}
