import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";

export function Main({ todos, dispatch, startTime, endTime }) {
    const { pathname: route } = useLocation();
    const [todoSelectedList, setTodoSelectedList] = useState([])



    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );


    const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }), [dispatch]);

    return (
        
        <main className="main" data-testid="main">
           
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            
                <ul className={classnames("todo-list")} data-testid="todo-list">
                    {visibleTodos && visibleTodos.map((todo, index) => {
                        return (
                            <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} clrChange={visibleTodos[visibleTodos.length - 1] === todo} todoSelectedList={todoSelectedList} setTodoSelectedList={setTodoSelectedList} />
                        )
                    })}
                </ul>
             

        </main>
        
    );
}