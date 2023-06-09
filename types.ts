export interface User {
    id?: number,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    avatar?: string,
    username?: string,
    [key: string]: any
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

interface ReturnTypes {
    default: User;
    boolean: boolean;
}
interface ListResponse {
    data: ListItem[];
    page: number;
    total_pages: number;
}  

interface ListItem {
    id?: number;
    name: string;
    year: Date;
    color: String;
    pantone_value: String;
}

export type UserWithoutPassword = Omit<User, 'password'>
export type { GetUserResponse, ListItem, ListResponse, ReturnTypes }
