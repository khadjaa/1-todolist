import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ec578b22-e0ab-48ce-86ed-f73094d8dad1',
    },
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{
            item: TodolistType
        }>>, { title: string }>(`todo-lists`, {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(id: string, newIsDone: boolean, todolistId: string) {
        return instance.put(`todo-lists/${todolistId}/tasks/${id}`, {newIsDone})
    },
    deleteTask(id: string, todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${id}`)
    }
}
