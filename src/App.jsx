import { useEffect, useState } from 'react'
import { CreateBtn } from './components/CreateBtn/CreateBtn'
import { Filter } from "./components/Filter/Filter.jsx"
import { ModalComponent } from './components/Modal/Modal.jsx'
import { Task } from "./components/Task/Task.jsx";
import './App.css'

function App() {

    const [status, setStatus] = useState();
    const [modalFlag, setModalFlag] = useState(false);
    // const [taskTitle, setTaskTitle] = useState("");
    // const [taskDescription, setTaskDescription] = useState("");
    const [formdata, setFormdata] = useState({});
    const [tasks, setTasks] = useState([]);
    const [editFlag, setEditFlag] = useState(false);
    const [editTaskId, setEditTaskId] = useState(false);
    const [filterForm, setFilterForm] = useState({});
    const [filteredTasks, setFilteredTasks] = useState([]);

    //ローカルストレージの値をformdataに設定
    useEffect(() => {
        
        const storedTasks = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const task = JSON.parse(localStorage.getItem(key));
            storedTasks.push({ id: key, ...task });
        }
        setTasks(storedTasks);

    }, []);

    useEffect(() => {
        if (filteredTasks.length) {
            setTasks(filteredTasks);
        }
    }, [filteredTasks]);

    return (
        <>
            <CreateBtn modalFlag={modalFlag} setModalFlag={setModalFlag} />
            <Filter
                status={status} setStatus={setStatus}
                tasks={tasks}
                filterForm={filterForm} setFilterForm={setFilterForm}
                filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks}/>
            <ModalComponent
                modalFlag={modalFlag} setModalFlag={setModalFlag}
                formdata={formdata} setFormdata={setFormdata}
                tasks={tasks} setTasks={setTasks}
                editFlag={editFlag} setEditFlag={setEditFlag}
                editTaskId={editTaskId} setEditTaskId={setEditTaskId}
            />
            <Task
                tasks={tasks} setTasks={setTasks} 
                modalFlag={modalFlag} setModalFlag={setModalFlag}
                setEditFlag={setEditFlag} setEditTaskId={setEditTaskId}
                filteredTasks={filteredTasks} 
            />
        </>
    );
}

export default App
