import React, {useState} from 'react';
import '../css/TodoTempate.scss'
import {useAuthStore} from "../../stores/store";
import Calendar from "react-calendar";
import { MdAdd } from 'react-icons/md';
const ToDoTemplate = ({children} : {children : React.ReactNode}) => {
    const [modal, setModal] = useState(false);

    const {username} = useAuthStore();
    const Modal = () => {
        return(
            <div className="modal">
                <Calendar value={Date()}/>
            </div>
        );
    }
    return (
        <div className="TodoTemplate">
            <div className="app-title">{username}'s Todo List
                <button className="app-title" onClick={() => setModal(!modal)}>
                    <MdAdd/>
                </button>
            </div>
            {modal ? <Modal/> : null}
            <div className="content">{children}</div>
        </div>
    );
};

export default ToDoTemplate;