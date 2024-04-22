import React, {useState, useRef, useCallback} from 'react';
import ToDoInsert from "./ToDoInsert";
import ToDoList from "./ToDoList";
import ToDoTemplate from "./ToDoTemplate";

const MainView = () => {

    const [todos, setTodos] = useState([
        {
            id : 1,
            text: 'ToDo List 1',
            checked: true,
        },
        {
            id : 2,
            text: 'ToDo List 2',
            checked: true,
        },
        {
            id : 3,
            text: 'ToDo List 3',
            checked: false,
        },
    ]);

    const nextId = useRef(4);
    const onInsert = useCallback(
        (text:any) => {
            const todo = {
                id:nextId.current,
                text,
                checked:false,
            };
            setTodos(todos.concat(todo));
            nextId.current += 1;
        },
        [todos],
    );

    const onRemove = useCallback(
        (id:number) => {
            setTodos(todos.filter(todo => todo.id !== id));
        },
        [todos],
    );

    const onToggle = useCallback(
        (id:number) => {
          setTodos(
              todos.map(todo =>
                todo.id === id? { ...todo, checked:!todo.checked} : todo,
                  ),
          );
      },
        [todos],
    );
    return (
        <ToDoTemplate>
            <ToDoInsert onInsert={onInsert}/>
            <ToDoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
        </ToDoTemplate>
    );
};

export default MainView;