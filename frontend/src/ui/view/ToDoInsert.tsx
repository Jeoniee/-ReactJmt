import { MdAdd } from 'react-icons/md';
import '../css/ToDoInsert.scss';
import React, {useState, useCallback} from 'react';


interface Props {
    onInsert : (text:any) => void;
}

const ToDoInsert : React.FC<Props> = ( {onInsert}) => {
    const[value, setValue] = useState('');

    const onChange = useCallback((e: any) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e:any) => {
            onInsert(value);
            setValue(''); //value값 초기화

            //submit 이벤트는 브라우저에서 새로고침 발생 , 이를 방지하기 위해 이 함수 호출 (버튼 누를때마다 새로고침된다는거)
            e.preventDefault();
        },
        [onInsert, value],
    );
    return (
        <form className="ToDoInsert" onSubmit={onSubmit}>
            <input
                placeholder="..."
                value={value}
                onChange={onChange}
            />
                <button type="submit">
                    <MdAdd/>
                </button>
        </form>
    );
};

export default ToDoInsert;