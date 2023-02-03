import { createTheme } from '@mui/material/styles';
export default createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff'
        },
        background: {
            default: '#222222',
            paper: '#333333'
        }
    },
});