import { createTheme } from "@mui/material";
// import Button from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: "12.8125rem"
                }
            }
        }
    }
});

export default theme;