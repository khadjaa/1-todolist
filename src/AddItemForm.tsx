import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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

    return (
        <div>
            <input value={title}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onKeyDownAddTaskHandler}/>
            <button onClick={onClickAddTaskHandler}>+</button>
        </div>
    );
};

export default AddItemForm;