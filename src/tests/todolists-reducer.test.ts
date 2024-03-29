import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, TodolistDomainType,
    todolistsReducer
} from '../features/Todolists/todolists-reducer'
import {v1} from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 1, filter: 'all', entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 2, filter: 'all', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    // const endState = TodoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const todoList = {
        id: 'todolist3',
        title: 'new todolist',
        addedDate: '',
        order: 2
    }

    const endState = todolistsReducer(startState, addTodoListAC(todoList))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todolist')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistsReducer(startState, changeTodoListTitleAC(action.id, action.title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, changeTodoListFilterAC(action.id, action.filter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})