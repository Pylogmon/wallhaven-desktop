import React, { useState } from 'react'
import { Button, Grid, Snackbar, Alert } from '@mui/material';
import { nanoid } from 'nanoid';
import { writeText } from '@tauri-apps/api/clipboard';

export default function ColorBar(props) {
    const { colors } = props;

    const [message, setMessage] = useState("");
    const [toast, setToast] = useState(false);
    const [severity, setSeverity] = useState('success');

    async function writeClipboard(txt) {
        writeText(txt).then(
            _ => { toastMassage(`颜色值${txt}已复制到剪切板`, 'success') },
            _ => { toastMassage(`写入剪切板失败，颜色值为：${txt}`, 'error') }
        );
    }

    function toastMassage(msg, severity) {
        setMessage(msg);
        setSeverity(severity);
        setToast(true);
    }
    return (
        <>
            <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
                {
                    colors.map(x => {
                        return <Grid item xs='auto' key={nanoid()}>
                            <Button
                                onClick={() => { writeClipboard(x) }}
                                sx={{
                                    backgroundColor: x,
                                    height: '10px',
                                    ":hover": {
                                        backgroundColor: x,
                                        height: '20px'
                                    }
                                }}
                            />
                        </Grid>
                    })
                }
            </Grid >
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={toast}
                autoHideDuration={3000}
                onClose={() => { setToast(false) }}
            >
                <Alert onClose={() => { setToast(false) }} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
