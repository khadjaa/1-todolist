import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ec578b22-e0ab-48ce-86ed-f73094d8dad1',
    },
})

export const todolistAPI = {
    getTodolist() {
        return instance.get(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title})
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`, { title: title })
        return promise
    },
    deleteTodoList(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    }

}
