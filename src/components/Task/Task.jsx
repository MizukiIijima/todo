import { useCallback } from 'react';
import "./Task.css";

export const Task = ({ tasks, setModalFlag, setEditFlag, setEditTaskId }) => {

    const handleClick = useCallback((taskId) => {
        setModalFlag(true);
        setEditFlag(true);
        setEditTaskId(taskId);
    }, [setModalFlag, setEditFlag, setEditTaskId]);

    const getStatus = (status) => {
        switch(status){
            case "notstart":
                return "未着手";
            case "working":
                return "作業中";
            case "complete":
                return "完了";
        }
    }

    return (
        <ul className="taskList">
            {tasks.map((task, index) => (
                <li className="taskSingle" key={index} onClick={() => handleClick(task.id)}>
                    <div className="taskSingle-block">
                        <h2>{task.title}</h2>
                        <button className="taskSingle-button">
                            {getStatus(task.status)}
                        </button>
                    </div>
                    <p>{task.description}</p>
                </li>
            ))}
        </ul>
    );
}
