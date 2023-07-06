import React, {useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC, removeTaskAC, updateTaskTC} from "./store/tasks-reducer";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./AppWithRedux";
import {useAppDispatch} from "./store/store";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useAppDispatch()

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todoListId))
    },[] )

    const changeCheckBoxHandler = (tID: string, eventValue: boolean) => {
        // dispatch(changeTaskStatusAC(tID, eventValue, props.todoListId))
        dispatch(updateTaskTC(tID, eventValue, props.todoListId))
    }

    const onClickRemoveTaskHandler = (id: string) => {
        dispatch(deleteTaskTC(id, props.todoListId))
    }

    return (
        <div key={props.task.id}>
            <Checkbox
                checked={props.task.isDone}
                color='primary'
                onChange={(e) => changeCheckBoxHandler(props.task.id, e.currentTarget.checked)}
            />
            <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitleHandler}/>
            <IconButton onClick={() => onClickRemoveTaskHandler(props.task.id)}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
})

