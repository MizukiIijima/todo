import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { TextField, Button } from "@mui/material";
import "./Modal.css";

export const ModalComponent = ({ modalFlag, setModalFlag, formdata, setFormdata, tasks, editFlag, setEditFlag, editTaskId, setEditTaskId }) => {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
        }
    });

    useEffect(() => {
        if (editFlag && editTaskId) {
            const task = JSON.parse(localStorage.getItem(editTaskId));
            if (task) {
                setValue("title", task.title);
                setValue("description", task.description);
            }
        }
    }, [editFlag, editTaskId, setValue]);

    const createTask = (data) => {
        setFormdata(data);
        const id = Date.now();
        const task = {
            title: data.title,
            description: data.description,
            status: "notStart"
        }
        localStorage.setItem(id, JSON.stringify(task));
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
            <form onSubmit={handleSubmit(createTask)}>
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
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ margin: "auto", display: "block" }}
                >
                    作成する
                </Button>
            </form>
        </Modal>
    );
}
