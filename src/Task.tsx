import React from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./AppWithRedux";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = (props: TaskPropsType) => {

    const dispatch = useDispatch()

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todoListId))
    }

    const changeCheckBoxHandler1 = (tID: string, eventValue: boolean) => {
        dispatch(changeTaskStatusAC(tID, eventValue, props.todoListId))
    }

    const onClickRemoveTaskHandler = (id: string) => {
        dispatch(removeTaskAC(id, props.todoListId))
    }

    return (
        <div key={props.task.id}>
            <Checkbox
                checked={props.task.isDone}
                color='primary'
                onChange={(e) => changeCheckBoxHandler1(props.task.id, e.currentTarget.checked)}
            />
            <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitleHandler}/>
            <IconButton
                onClick={() => onClickRemoveTaskHandler(props.task.id)}
            >
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}

