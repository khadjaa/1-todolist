import {
    addTaskAC, removeTaskAC,
    tasksReducer,
    TasksStateType
} from '../features/Todolists/tasks-reducer'
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 1,
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 2,
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 1,
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                startDate: '',
                order: 2,
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1'
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('1', 'todolistId1')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(1)
})

test('correct task should be added to correct array', () => {
    const task = {
        id: '3',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        startDate: '',
        order: 1,
        description: '',
        priority: TaskPriorities.Hi,
        todoListId: 'todolistId1'
    }
    const action = addTaskAC(task)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId1'][0].title).toBe('juce')
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})
//
//
// test('status of specified task should be changed', () => {
//     const action = changeTaskStatusAC('2', false, 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(startState['todolistId1'][1].isDone).toBe(true)
//     expect(endState['todolistId2'][1].isDone).toBe(false)
// })
//
// test('task title should be changed', () => {
//     const action = changeTaskTitleAC('2', 'Sneakers', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(startState['todolistId1'][1].title).toBe('JS')
//     expect(endState['todolistId2'][1].title).toBe('Sneakers')
// })
//
// test('new array should be added when new todolist is added', () => {
//     const action = addTodoListAC('new todolist')
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
