import {tasksReducer, TasksStateType} from "../features/Todolists/tasks-reducer";
import {addTodoListAC, TodolistDomainType, todolistsReducer} from "../features/Todolists/todolists-reducer";
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const todoList = {id: 'todolist3', title: 'new todolist', addedDate: '', order: 2}

    const action = addTodoListAC(todoList)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.item.id)
    expect(idFromTodolists).toBe(action.payload.item.id)
})
