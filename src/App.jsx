import { useState } from 'react'
import { CreateBtn } from './components/CreateBtn/CreateBtn'
import { Filter } from "./components/Filter/Filter.jsx"
import { ModalComponent } from './components/Modal/Modal.jsx'
import './App.css'

function App() {

    const [status, setStatus] = useState();
    const [modalFlag, setModalFlag] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [formdata, setFormdata] = useState({});

    return (
        <>
            <CreateBtn modalFlag={modalFlag} setModalFlag={setModalFlag}/>
            <Filter status={status} setStatus={setStatus}/>
            <ModalComponent
                modalFlag={modalFlag} setModalFlag={setModalFlag}
                formdata={formdata} setFormdata={setFormdata}
                taskTitle={taskTitle} setTaskTitle={setTaskTitle} 
                taskDescription={taskDescription} setTaskDescription={setTaskDescription}
            />
        </>
    );
}

export default App
