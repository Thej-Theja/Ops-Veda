import { useReducer, useState } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { todoReducer } from "./reducer";

import "./app.css";

const divStyle = {
    color: 'Red',
    backgroundColor: 'lightgray',
    padding: '10px',
    borderRadius: '5px',
    fontSize: "18px",
    
};
const timer = {
    padding: "10px",
    fontSize: "16px",
}
export function App() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    return (
        <>
            <div className="card-box-container">
                <div className="startTimeCard">
                    <h3 style={divStyle}>Starting Time</h3>
                    <span style={timer}> {startTime}</span>
                </div>
                <div className="endTimeCard">
                    <h3 style={divStyle}>End Time</h3>
                    <span style={timer}>{endTime}</span>
                </div>
            </div>
            <>
                <Header dispatch={dispatch} setStartTime={setStartTime} />
                <Main todos={todos} dispatch={dispatch} startTime={startTime} endTime={endTime} />
                <Footer todos={todos} dispatch={dispatch} setEndTime={setEndTime} />
            </>


        </>

    );
}
