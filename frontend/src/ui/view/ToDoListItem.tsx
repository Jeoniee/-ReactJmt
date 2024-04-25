import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from "react-icons/md";
import '../css/ToDoListItem.scss';
import cn from 'classnames';
import React from "react";
import { Todo } from './types';

interface Props {
    todo : Todo; // todo prop의 타입을 Todo로 변경
    onRemove : any;
    onToggle : any;
    style:any;
}

const ToDoListItem : React.FC<Props> = ({todo, onRemove, onToggle,style}) => {
    const {id,text, checked} = todo;

    return (
        <div className="ToDoListItem-virtualized" style={style}>
            <div className="ToDoListItem">
                <div className={cn('checkBox', {checked})}
                     onClick={() => onToggle(id)}
                >
                    {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                    <div className="text">{text}</div>
                </div>
                <div className="remove" onClick={ () => onRemove(id)}>
                    <MdRemoveCircleOutline/>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ToDoListItem);