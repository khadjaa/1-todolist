import React, {useCallback} from 'react';
import {changeTaskTitleAC, deleteTaskTC, TasksDomainType, updateTaskStatusTC} from "../../tasks-reducer";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../../../app/store";
import {TaskStatuses} from "../../../../api/todolist-api";

type TaskPropsType = {
    task: TasksDomainType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useAppDispatch()

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todoListId))
    }, [])

    const changeCheckBoxHandler = (tID: string, eventValue: boolean) => {
        console.log(eventValue)
        dispatch(updateTaskStatusTC(tID, props.todoListId, eventValue ? TaskStatuses.Completed : TaskStatuses.New))
    }

    const onClickRemoveTaskHandler = (id: string) => {
        dispatch(deleteTaskTC(id, props.todoListId))
    }

    return (
        <div key={props.task.id}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color='primary'
                onChange={(e) => changeCheckBoxHandler(props.task.id, e.currentTarget.checked)}
            />
            <EditableSpan title={props.task.title}
                          changeTaskTitle={changeTaskTitleHandler}
                          isDisabled={props.task.entityStatus === 'loading'}/>
            <IconButton onClick={() => onClickRemoveTaskHandler(props.task.id)}
                        disabled={props.task.entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
})

