import axios from 'axios'

export async function filterUsers( value: any, page: number = 1) {
    const { data: response } = await axios.get(`https://reqres.in/api/users?page=${page}`)
    console.log(response)
    return response
}
