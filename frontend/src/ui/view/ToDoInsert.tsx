import { MdAdd } from 'react-icons/md';
import '../css/ToDoInsert.css';
import React from 'react';

const ToDoInsert = () => {
    return (
        <form className="ToDoInsert">
            <input placeholder="할일을 입력하세요"/>
                <button type="submit">
                    <MdAdd/>
                </button>
        </form>
    );
};

export default ToDoInsert;