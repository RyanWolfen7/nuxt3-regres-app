export interface User {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar: string
    [key: string]: any;
}

interface ErrorResponse {
    message: string;
    statusCode: number;
    statusMessage?: string;
    stack?: string;
    // add any additional fields as needed
}

interface GetUserResponse {
    data: User[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

export type UserWithoutPassword = Omit<User, 'password'>
export type { GetUserResponse }
