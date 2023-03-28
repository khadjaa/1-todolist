import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key:string] : any
}

export const TodoListsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodoListAC = (id: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}