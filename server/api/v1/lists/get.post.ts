import { getLists } from "~/server/models/v1/lists";

interface ResponseData {
    list: any[]; // Replace `any[]` with the actual type of your list items
    page: number;
    totalPages: number;
}

interface ResponseError {
    statusCode: number,
    message: string,
}

export default defineEventHandler(async (event): Promise<ResponseData | ResponseError> => {
    const body = await readBody<{ page: number }>(event);
    const userWithPassword = event.context.user;
    if (!userWithPassword) {
        return createError({
            statusCode: 204,
            message: 'Not Authorized to get this',
        });
    }
    const response = await getLists(body.page);
    if (!response) {
        return createError({
            statusCode: 400,
            message: 'Could not find lists',
        });
    }

    const { data, page: pageResponse, total_pages: totalPages } = response;
    return { list: data, page: pageResponse, totalPages };
});
