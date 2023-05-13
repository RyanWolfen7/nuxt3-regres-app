export interface User {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar: string
}

interface ErrorResponse {
    message: string;
    statusCode: number;
    statusMessage?: string;
    stack?: string;
    // add any additional fields as needed
}

export type UserWithoutPassword = Omit<User, 'password'>
