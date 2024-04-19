import React from 'react';
import '../css/TodoTempate.css'
import {useAuthStore} from "../../stores/store";
import ToDoInsert from "./ToDoInsert";
const MainView = () => {

    const {username} = useAuthStore();

    return (
        <div className="TodoTemplate">
           <div className="app-title">{username}님, 환영합니다</div>
           <div className="content"><ToDoInsert/>
           </div>
        </div>
    );
};

export default MainView;