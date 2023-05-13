import { filterUsers } from "~/server/utils/reqres"

export async function userExists(email: string) {
    const exists = filterUsers(email)
    return exists
}
