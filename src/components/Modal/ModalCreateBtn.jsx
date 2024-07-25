import { Button } from "@mui/material";

export const ModalCreateBtn = () => {
    return(
        <Button
            color="primary"
            variant="contained"
            sx={{margin: "auto",
                display: "block"
            }}>作成する</Button>
    );
}