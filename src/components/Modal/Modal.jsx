// import { Modal } from "@mui/material";
import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { TextField, Button } from "@mui/material";
import "./Modal.css";

export const ModalComponent = ({modalFlag, setModalFlag, formdata, setFormdata, taskTitle, setTaskTitle, taskDescription, setTaskDescription}) => {

    const {register, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            title: taskTitle,
            description: taskDescription,
        }
    });

    const createTask = (data) => {
        setFormdata(data);
        localStorage.setItem('title',data.title);
        localStorage.setItem('description', data.description);
        setModalFlag(false);
        reset();
    }

    //モーダルを閉じる
    const closeModal = () => {
        setModalFlag(false);
    }

    return(
            <Modal
                isOpen={modalFlag}
                overlayClassName="customOverlay"
                className="customContent"
            >
                <CloseOutlinedIcon
                    onClick={closeModal}
                    sx={{position: "absolute", top: "35px", right: "35px"}}
                />
                <form onSubmit={handleSubmit(createTask)}>
                    <TextField type="text" label="タイトル" className="customTextField"
                        {...register("title",{
                            required: "タイトルは必須です",
                            maxLength: {
                                value: 30,
                                message: "30文字以内で入力してください"
                            }
                        })}
                        error={"title" in errors}
                        helperText={errors.title?.message}
                        InputLabelProps={{
                            sx: {
                                transform: "translate(0%, -125%)",
                                '&.Mui-focused': {
                                    transform: "Translate(14px, -9px) scale(0.75)"
                                }
                            }
                        }}
                    />
                    <TextField label="説明" className="customTextArea"
                        multiline
                        rows={10}
                        {...register("description", {
                            required: "説明は必須です",
                        })}
                        error={"description" in errors}
                        helperText={errors.description?.message}
                        InputLabelProps={{
                            sx: {
                                transform: "translate(0%, -125%)",
                                '&.Mui-focused': {
                                    transform: "Translate(14px, -9px) scale(0.75)"
                                }
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{margin: "auto",
                            display: "block"
                        }}>作成する
                    </Button>
                </form>
            </Modal>
    );

}