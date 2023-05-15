import { ListItem } from "~/types"

export const useListData = () => {
    return useState('listData', () => ({
        list: [] as ListItem[],
        page: 1,
        totalPages: 1,
        statusCode: null,
        message: ''
    }))
}
