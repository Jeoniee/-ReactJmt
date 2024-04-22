import ToDoListItem from './ToDoListItem';
import '../css/ToDoList.scss';
import React from 'react';
import { Todo } from './types';

interface Props {
    todos : Todo[];
    onRemove : (id:number) => void;
    onToggle : (id:number) => void;
}
const ToDoList : React.FC<Props> = ( {todos, onRemove, onToggle}) => {
    return (
        <div className="ToDoList">
            {todos.map(todo => (
                <ToDoListItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
};

export default ToDoList;