import React, { useState } from 'react'
import { Tooltip, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material'
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { invoke } from '@tauri-apps/api/tauri'

export default function ImageActions(props) {
    const { setOpenInfo, meta } = props;
    const [downloading, setDownloading] = useState(false);
    const [setting, setSetting] = useState(false);
    const [message, setMessage] = useState("");
    const [toast, setToast] = useState(false);
    const [severity, setSeverity] = useState('success');

    async function download() {
        setDownloading(true);
        invoke('download_image', { "url": meta['path'] })
            .then(
                _ => {
                    setDownloading(false);
                    toastMassage("下载成功！", "success");
                },
                err => {
                    setDownloading(false);
                    toastMassage(`下载失败！${err}`, "error");
                }
            )
    }
    async function setWallpaper() {
        setSetting(true);
        invoke('set_as_wallpaper', { "url": meta['path'] })
            .then(
                _ => {
                    setSetting(false);
                    toastMassage("壁纸设置成功！", "success");
                },
                err => {
                    setSetting(false);
                    toastMassage(`壁纸设置失败！${err}`, "error");
                }
            )
    }
    function toastMassage(msg, severity) {
        setMessage(msg);
        setSeverity(severity);
        setToast(true);
    }

    return (
        <>
            <Tooltip title="收藏">
                <IconButton>
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
            </Tooltip>
            {
                !downloading ? <Tooltip title="下载">
                    <IconButton onClick={download}>
                        <CloudDownloadOutlinedIcon />
                    </IconButton>
                </Tooltip> : <CircularProgress />
            }
            {
                !setting ? <Tooltip title="设为壁纸">
                    <IconButton onClick={setWallpaper}>
                        <WallpaperOutlinedIcon />
                    </IconButton>
                </Tooltip> : <CircularProgress />
            }

            <Tooltip title="详细信息">
                <IconButton onClick={() => { setOpenInfo(true) }}>
                    <InfoOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={toast}
                autoHideDuration={3000}
                onClose={() => { setToast(false) }}
            >
                <Alert onClose={() => { setToast(false) }} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ >
    )
}
