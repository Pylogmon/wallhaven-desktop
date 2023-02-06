import React, { useState } from 'react'
import { Card, CardMedia, CardActions, IconButton, Tooltip, Dialog, DialogContent, DialogActions, Skeleton, CardActionArea } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageViewer from '../ImageViewer';
import ImageActions from '../ImageActions';
import ImageInfo from '../ImageInfo';

export default function ImageCard(props) {
    const { meta } = props;
    const [openImage, setOpenImage] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [loading, setLoading] = useState(true);
    let image = new Image();
    image.src = meta['thumbs']['small'];
    image.onload = () => {
        setLoading(false);
    }
    return (
        <>
            <Card sx={{ width: 200, margin: '8px' }} >
                <CardActionArea onClick={() => { setOpenImage(true) }}>
                    {!loading ? <CardMedia
                        component='img'
                        height='140'
                        image={meta['thumbs']['small']}
                    /> :
                        <>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="circular" width={20} height={20} />
                            <Skeleton variant="rectangular" width={210} height={40} />
                            <Skeleton variant="rounded" width={210} height={50} />
                        </>
                    }
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <ImageActions setOpenInfo={setOpenInfo} meta={meta} />
                </CardActions>
            </Card>
            <Dialog
                fullWidth
                maxWidth={false}
                open={openImage}
                onClose={() => { setOpenImage(false) }}
            >
                <DialogContent sx={{ padding: 0 }}>
                    <ImageViewer meta={meta} />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' }}>
                    <ImageActions setOpenInfo={setOpenInfo} meta={meta} />
                    <Tooltip title="关闭">
                        <IconButton onClick={() => { setOpenImage(false) }}>
                            <CloseOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openInfo}
                onClose={() => { setOpenInfo(false) }}
            >
                <ImageInfo setOpenInfo={setOpenInfo} imageId={meta['id']} />
            </Dialog>
        </>
    )
}
