import React, {useState, useRef, useCallback, useReducer} from 'react';
import ToDoInsert from "./ToDoInsert";
import ToDoList from "./ToDoList";
import ToDoTemplate from "./ToDoTemplate";

function createBulkTodos(){
    const array = [];
    for (let i = 0; i < 2500; i++) {
        array.push({
            id : i,
            text : `todo ${i}`,
            checked:false,
        })
    }
    return array;
}

function todoReducer(todos:any, action:any){
    switch(action.type){
        case 'INSERT':
            return todos.concat(action.todo);
        case 'REMOVE':
            return todos.filter((todo: { id: any; }) => todo.id !== action.id);
        case 'TOGGLE':
            return todos.map((todo: { id: any; checked: any; }) =>
            todo.id === action.id ? {...todo, checked: !todo.checked} : todo,
                );
        default:
            return todos;
    }
}

const MainView = () => {
    const [todos, dispatch] = useReducer(todoReducer,[],createBulkTodos);
    const nextId = useRef(2501);
    const onInsert = useCallback(
        (text:any) => {
            const todo = {
                id:nextId.current,
                text,
                checked:false,
            };
            dispatch({type:'INSERT', todo});
            nextId.current += 1;
        },
        [todos],
    );

    const onRemove = useCallback(
        (id:number) => {
            dispatch({type:'REMOVE', id});
        },
        [],
    );

    const onToggle = useCallback(
        (id:number) => {
          dispatch({type:'TOGGLE', id});
      },
        [],
    );
    return (
        <ToDoTemplate>
            <ToDoInsert onInsert={onInsert}/>
            <ToDoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
        </ToDoTemplate>
    );
};

export default MainView;