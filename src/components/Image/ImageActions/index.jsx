import React from 'react'
import { Tooltip, IconButton } from '@mui/material'
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ImageActions(props) {
    const { setOpenInfo } = props;
    return (
        <>
            <Tooltip title="收藏">
                <IconButton>
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="下载">
                <IconButton>
                    <CloudDownloadOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="设为壁纸">
                <IconButton>
                    <WallpaperOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="详细信息">
                <IconButton onClick={() => { setOpenInfo(true) }}>
                    <InfoOutlinedIcon />
                </IconButton>
            </Tooltip>
        </ >
    )
}
