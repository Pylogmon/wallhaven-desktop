import React, { useState } from 'react'
import { Card, CardMedia, CardActions, IconButton, Tooltip, Dialog, DialogContent, DialogActions } from '@mui/material'
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import ImageViewer from '../ImageViewer';

export default function ImageCard(props) {
    const { meta } = props;
    const [open, setOpen] = useState(false);
    return (
        <>
            <Card sx={{ maxWidth: 250, margin: '8px' }}>
                <CardMedia
                    component='img'
                    height='140'
                    image={meta['thumbs']['small']}
                />
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Tooltip title="收藏">
                        <IconButton>
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="查看原图">
                        <IconButton onClick={() => { setOpen(true) }}>
                            <WallpaperOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="下载">
                        <IconButton>
                            <CloudDownloadOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="设为壁纸">
                        <IconButton>
                            <AddToQueueOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <Dialog
                fullWidth
                maxWidth={false}
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <DialogContent>
                    <ImageViewer meta={meta} />
                </DialogContent>
                <DialogActions>
                    <Tooltip title="查看原图">
                        <IconButton onClick={() => { setOpen(false) }}>
                            <WallpaperOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </>
    )
}
