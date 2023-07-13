import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ec578b22-e0ab-48ce-86ed-f73094d8dad1',
    },
})

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
        return instance.put<ResponseType, AxiosResponse<ResponseType>, {
            title: string
        }>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, id: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${id}`, model)
    },
    deleteTask(id: string, todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
    }
}

export const authAPI = {
    login(data: loginDataType) {
        return instance.post(`auth/login`, data)
    },
    me() {
        return instance.get(`auth/me`)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export type loginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type postLoginDataResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {
        userId: number
    }
}
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
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}