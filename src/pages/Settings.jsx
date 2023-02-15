import React, { useState } from 'react'
import { Box, TextField, Tooltip, Button, InputAdornment, Divider, Snackbar, Alert } from '@mui/material'
import SettingList from '../components/Setting/SettingList'
import SettingItem from '../components/Setting/SettingItem'
import { open } from '@tauri-apps/api/dialog';
import { get, set, writeConfig } from '../utils/config'

export default function Settings() {
    const [message, setMessage] = useState("");
    const [toast, setToast] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [apikey, setApikey] = useState(get('apikey', ''));
    const [username, setUsername] = useState(get('username', ''));
    const [extFile, setExtFile] = useState(get('extFile', ''));

    async function selectFile() {
        setExtFile(await open())
    }

    function saveConfig() {
        set('apikey', apikey);
        set('extFile', extFile);
        set('username', username);
        writeConfig();
        toastMassage('保存成功', 'success')
    }

    function toastMassage(msg, severity) {
        setMessage(msg);
        setSeverity(severity);
        setToast(true);
    }
    return (
        <Box sx={{
            width: '100%',
            padding: '0 30px',
            height: 'calc(100vh - 60px)',
            overflow: 'auto'
        }}>
            <SettingList>
                <SettingItem label="ApiKey">
                    <Tooltip title="注册wallhaven.cc以获取apikey">
                        <TextField
                            size="small"
                            value={apikey}
                            onChange={(e) => { setApikey(e.target.value) }}
                            sx={{ width: 250 }}
                        />
                    </Tooltip>
                </SettingItem>
                <Divider />
                <SettingItem label="用户名">
                    <Tooltip title="wallhaven.cc用户名，访问收藏需要">
                        <TextField
                            size="small"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            sx={{ width: 250 }}
                        />
                    </Tooltip>
                </SettingItem>
                <Divider />
                <SettingItem label="外部脚本">
                    <Tooltip title="正常使用无需设置，当无法正常设置壁纸时，可以使用自己的脚本来设置壁纸">
                        <TextField
                            size="small"
                            sx={{ width: 250 }}
                            value={extFile}
                            onChange={(e) => { setExtFile(e.target.value) }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Button size="small" onClick={selectFile}>浏览</Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Tooltip>
                </SettingItem>
            </SettingList>
            <Button onClick={saveConfig} variant='contained'>保存</Button>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={toast}
                autoHideDuration={3000}
                onClose={() => { setToast(false) }}
            >
                <Alert onClose={() => { setToast(false) }} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
