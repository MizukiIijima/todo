import { useEffect, useState } from 'react';
import { CreateBtn } from './components/CreateBtn/CreateBtn';
import { Filter } from "./components/Filter/Filter.jsx";
import { ModalComponent } from './components/Modal/Modal.jsx';
import { Task } from "./components/Task/Task.jsx";
import './App.css'

function App() {

    const [modalFlag, setModalFlag] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [tasks, setTasks] = useState([]);
    const [editFlag, setEditFlag] = useState(false);
    const [editTaskId, setEditTaskId] = useState(false);
    const [filterForm, setFilterForm] = useState({});
    const [filteredTasks, setFilteredTasks] = useState([]);

    // ローカルストレージの値をformdataに設定
    useEffect(() => {
        const storedTasks = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const task = JSON.parse(localStorage.getItem(key));
            storedTasks.push({ id: key, ...task });
        }
        setTasks(storedTasks);
        setFilteredTasks(storedTasks);
    }, []);

    return (
        <>
            <CreateBtn modalFlag={modalFlag} setModalFlag={setModalFlag} />
            <Filter tasks={tasks} setFilterForm={setFilterForm} setFilteredTasks={setFilteredTasks}/>
            <ModalComponent
                modalFlag={modalFlag} setModalFlag={setModalFlag}
                formdata={formdata} setFormdata={setFormdata}
                tasks={tasks} setTasks={setTasks}
                editFlag={editFlag} setEditFlag={setEditFlag}
                editTaskId={editTaskId} setEditTaskId={setEditTaskId}
            />
            <Task
                tasks={filteredTasks}
                setModalFlag={setModalFlag}
                setEditFlag={setEditFlag}
                setEditTaskId={setEditTaskId}
            />
        </>
    );
}

export default App
