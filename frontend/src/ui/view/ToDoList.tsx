import ToDoListItem from './ToDoListItem';
import {List} from 'react-virtualized';
import '../css/ToDoList.scss';
import React,{useCallback} from 'react';
import { Todo } from './types';

interface Props {
    todos : Todo[];
    onRemove : (id:number) => void;
    onToggle : (id:number) => void;
}
const ToDoList : React.FC<Props> = ( {todos, onRemove, onToggle}) => {
    const rowRenderer = useCallback(
        ({index,key,style} : any) => {
            const todo = todos[index];
            return(
                <ToDoListItem
                    todo={todo}
                    key={key}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    style={style}
                />
            );
        },
        [onRemove,onToggle,todos],
    );
    return (
      <List
        className="ToDoList"
        width={512}
        height={513}
        rowCount={todos.length}
        rowHeight={57}
        rowRenderer={rowRenderer}
        list={todos}
        style={{outline:'none'}}
      />
    );
};

export default React.memo(ToDoList);