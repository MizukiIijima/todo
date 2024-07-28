import { useCallback } from 'react';
import "./Task.css";

export const Task = ({ tasks, setModalFlag, setEditFlag, setEditTaskId }) => {

    const handleClick = useCallback((taskId) => {
        setModalFlag(true);
        setEditFlag(true);
        setEditTaskId(taskId);
    }, [setModalFlag, setEditFlag, setEditTaskId]);

    return (
        <ul className="taskList">
            {tasks.map((task, index) => (
                <li className="taskSingle" key={index} onClick={() => handleClick(task.id)}>
                    <h2>{task.title}</h2>
                    <button>{task.status}</button>
                    <p>{task.description}</p>
                </li>
            ))}
        </ul>
    );
}
