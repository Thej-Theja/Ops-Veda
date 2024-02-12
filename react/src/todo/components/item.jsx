import { memo, useState, useCallback, useRef, useEffect } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, dispatch, index, clrChange, todoSelectedList,setTodoSelectedList }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;
    // Updated by Theja
    const changeTitleClr = useRef()
   

    const toggleItem = useCallback(() => dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]);
    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]);

    
// Updated  by Theja
    useEffect(() => {
        if (todoSelectedList.length > 0) {
            if (todo.id === todoSelectedList[todoSelectedList.length - 1]) changeTitleClr.current.style.color = "green"
            if (todoSelectedList.length > 1) {
                if (todo.id === todoSelectedList[todoSelectedList.length - 2]) {
                    changeTitleClr.current.style.color = "#FF00FF"
                }
            }
            if(todoSelectedList.length>2){
                if(todo.id===todoSelectedList[todoSelectedList.length-3]){
                    changeTitleClr.current.style.color = "yellow"
                }
            }
            if(todoSelectedList.length>3){
                if(todo.id===todoSelectedList[todoSelectedList.length-4]){
                    changeTitleClr.current.style.color = "grey"
                }
            }
            if(!todoSelectedList.includes(todo.id)){
                changeTitleClr.current.style.color = "black"
            }
        }

    }, [todoSelectedList])
// Updated by Theja
    const handleChangeButton=(e)=>{
        toggleItem()
       
        const { value, checked } = e.target;
        if (checked) {
            setTodoSelectedList([...todoSelectedList, value]);
        } else {
            setTodoSelectedList(todoSelectedList.filter(item => item !== value));
        }
       
    }
//  Updated by Theja
    useEffect(() => {
        let timer
        if (clrChange) {
            changeTitleClr.current.style.color = "red"
            timer = setTimeout(() => { changeTitleClr.current.style.color = "black" }, 15000)
        } else {
            changeTitleClr.current.style.color = "black"
        }
        return () => {
            clearTimeout(timer)
        }
    }, [clrChange])

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
            
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={handleChangeButton}  value={id}/>
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick} ref={changeTitleClr}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
});
