import React, {ChangeEvent, FC, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        changeTaskTitle
    }) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState('')

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
        editMode
            ? <input value={inputValue}
                     autoFocus
                     onBlur={activateViewModeHandler}
                     onChange={onChangeInputValue}
            />
            : <span onDoubleClick={activateEditModeHandler}>{title}</span>
    );
};

