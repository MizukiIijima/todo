import { Button } from "@mui/material";

export const CreateBtn = ({setModalFlag}) => {
    
    const createMemo = () => {
        setModalFlag(true);
    }

    return(
        <Button
            variant="contained"
            onClick={createMemo}
            color="primary"
            sx={{
                marginLeft: "auto", 
                display: "block", 
            }}>新規作成</Button>
    );
}