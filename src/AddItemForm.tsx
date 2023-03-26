import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import {styled} from "@mui/material";

export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')

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

    const ButtonStyled = styled(Button)({
        backgroundColor: '#0063cc',
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',

        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        }
    })



    return (
        <div>
            <input value={title}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onKeyDownAddTaskHandler}/>
            {/*<button onClick={onClickAddTaskHandler}>+</button>*/}
            <ButtonStyled variant={'contained'}
                    onClick={onClickAddTaskHandler}
            >+</ButtonStyled>
        </div>
    );
};

export default AddItemForm;