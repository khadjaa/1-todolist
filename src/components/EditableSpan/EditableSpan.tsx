import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@mui/material/TextField';

export type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
    isDisabled?: boolean
}

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((
    {
        title,
        changeTaskTitle,
        isDisabled
    }) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState('')
    // const [error, setError] = useState(false)

    const activateEditModeHandler = () => {
        setEditMode(true)
        setInputValue(title)
    }
    const activateViewModeHandler = () => {
        setEditMode(false)
        changeTaskTitle(inputValue)
    }

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        editMode ?
            <TextField variant={'outlined'}
                       value={inputValue}
                       autoFocus
                       onChange={onChangeInputValue}
                       onBlur={activateViewModeHandler}
                       // error={!!error}
                       label={'Title'}
                       // helperText={error}
                       disabled={isDisabled}
            />
            : <span onDoubleClick={activateEditModeHandler}>{title}</span>
    );
})
