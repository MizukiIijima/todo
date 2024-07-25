// import { Modal } from "@mui/material";
import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalCreateBtn } from "./ModalCreateBtn";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, Icon, TextField } from "@mui/material";
import "./Modal.css";
import { Translate } from "@mui/icons-material";

export const ModalComponent = () => {

    const {register, handleSubmit, formState: { errors }} = useForm({});

    const [modalFlag, setModalFlag] = useState(false);

    const onsubmit = () => {
        alert ('OK')
    }

    return(
        <form onSubmit={handleSubmit(onsubmit)}>
            <Modal
                isOpen={modalFlag}
                overlayClassName="customOverlay"
                className="customContent"
            >
                <CloseOutlinedIcon
                    sx={{position: "absolute", top: "35px", right: "35px"}}
                />
                <TextField type="text" label="タイトル" className="customTextField"
                    {...register("title",{
                        required: "タイトルは必須です",
                        maxLength: {
                            value: 30,
                            message: "30文字以内で入力してください"
                        }
                    })
                    }
                    InputLabelProps={{
                        sx: {
                            transform: "translate(0%, -125%)",
                            '&.Mui-focused': {
                                transform: "Translate(14px, -9px) scale(0.75)"
                            }
                        }
                    }}
                />
                <TextField
                    label="説明"
                    className="customTextArea"
                    multiline
                    rows={10}
                    {...register("description", {
                        required: "説明は必須です",
                    })}
                    InputLabelProps={{
                        sx: {
                            transform: "translate(0%, -125%)",
                            '&.Mui-focused': {
                                transform: "Translate(14px, -9px) scale(0.75)"
                            }
                        }
                    }}
                />
                <ModalCreateBtn />
            </Modal>
        </form>
    );

}