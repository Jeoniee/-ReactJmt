import React from 'react';
import '../css/TodoTempate.scss'
import {useAuthStore} from "../../stores/store";

const ToDoTemplate = ({children} : {children : React.ReactNode}) => {

    const {username} = useAuthStore();

    return (
        <div className="TodoTemplate">
            <div className="app-title">{username}'s ToDoList </div>
            <div className="content">{children}</div>
        </div>
    );
};

export default ToDoTemplate;