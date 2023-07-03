import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    // const [error, setError] = useState('')
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        }
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() !== '') {
            if (e.key === 'Enter') {
                props.addItem(title)
                setTitle('')
            }
        }
    }

    return (
        <div>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
                       label={'Title'}
            />
            <IconButton
                color='primary'
                onClick={onClickAddTaskHandler}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;