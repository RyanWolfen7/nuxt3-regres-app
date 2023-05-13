export interface User {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar: string
}

export type UserWithoutPassword = Omit<User, 'password'>
