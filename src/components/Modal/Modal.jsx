import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { TextField, Button, InputLabel, MenuItem, Select } from "@mui/material";
import "./Modal.css";

export const ModalComponent = ({ modalFlag, setModalFlag, formdata, setFormdata, tasks, setTasks, editFlag, setEditFlag, editTaskId, setEditTaskId }) => {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: "",
        }
    });

    useEffect(() => {
        if (editFlag && editTaskId) {
            const task = JSON.parse(localStorage.getItem(editTaskId));
            if (task) {
                setValue("title", task.title);
                setValue("description", task.description);
                setValue("status", task.status);
            }
        }
    }, [editFlag, editTaskId, setValue]);

    let button;
    if (editFlag) {
        button = <Button type="submit" name="edit" color="secondary" variant="contained" sx={{ margin: "auto", display: "block" }}>更新する</Button>;
    } else {
        button = <Button type="submit" name="create" color="primary" variant="contained" sx={{ margin: "auto", display: "block" }}>作成する</Button>;
    }

    //タスク作成時
    const createTask = (data) => {
        setFormdata(data);
        const id = Date.now();
        const task = {
            title: data.title,
            description: data.description,
            status: "notStart"
        }
        setTasks([...tasks,{id,...task}])
        localStorage.setItem(id, JSON.stringify(task));
        setModalFlag(false);
        setEditFlag(false);
        setEditTaskId(null);
        reset();
    }

    //タスク編集時
    const editTask = (data, tasks) => {
        
        const updateTask = {
            title: data.title,
            description: data.description,
            status: data.status
        }

        localStorage.setItem(editTaskId,JSON.stringify(updateTask));

        const updateTasks = tasks.map(task => 
            task.id === editTaskId ? {id:editTaskId, ...updateTask} : task
        )
        setTasks(updateTasks);
        setModalFlag(false);
        setEditFlag(false);
        setEditTaskId(null);
        reset();

    }

    // モーダルを閉じる
    const closeModal = () => {
        setModalFlag(false);
        setEditFlag(false);
        setEditTaskId(null);
        reset();
    }

    const onSubmit = (data, event) => {
        if (event.nativeEvent.submitter.name === "create") {
            createTask(data);
        } else {
            editTask(data, tasks);
        }
    }

    return (
        <Modal
            isOpen={modalFlag}
            overlayClassName="customOverlay"
            className="customContent"
        >
            <CloseOutlinedIcon
                onClick={closeModal}
                sx={{ position: "absolute", top: "35px", right: "35px" }}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                {editFlag &&
                <>
                    <InputLabel className="customSelect">進捗</InputLabel>
                    <Select className="customSelect">
                        <MenuItem value={"notStart"}>未着手</MenuItem>
                        <MenuItem value={"working"}>作業中</MenuItem>
                        <MenuItem value={"complete"}>完了</MenuItem>
                    </Select>
                </>
                }
                <TextField type="text" label="タイトル" className="customTextField"
                    {...register("title", {
                        required: "タイトルは必須です",
                        maxLength: {
                            value: 30,
                            message: "30文字以内で入力してください"
                        }
                    })}
                    error={"title" in errors}
                    helperText={errors.title?.message}
                />
                <TextField label="説明" className="customTextArea"
                    multiline
                    rows={10}
                    {...register("description", {
                        required: "説明は必須です",
                    })}
                    error={"description" in errors}
                    helperText={errors.description?.message}
                />
                {button}
            </form>
        </Modal>
    );
}
