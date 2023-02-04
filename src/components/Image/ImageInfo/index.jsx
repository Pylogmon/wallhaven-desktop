import React, { useState, useEffect } from 'react'
import { Avatar, Card, CardHeader, CardMedia, CardContent, IconButton, Skeleton, Typography, Tooltip } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { fetch } from '@tauri-apps/api/http';
export default function ImageInfo(props) {
    const { setOpenInfo, imageId } = props;
    const [info, setInfo] = useState();
    const [loadingInfo, setLoadingInfo] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingAvatar, setLoadingAvatar] = useState(true);

    let image = new Image();
    let avatar = new Image();
    image.onload = () => {
        setLoadingImage(false);
    }
    avatar.onload = () => {
        setLoadingAvatar(false);
    }
    useEffect(() => {
        fetch(`https://wallhaven.cc/api/v1/w/${imageId}`, {
            method: 'GET',
            timeout: 30,
        }).then(
            res => {
                setInfo(res.data['data']);
                setLoadingInfo(false);
                image.src = res.data['data']['thumbs']['large'];
                avatar.src = res.data['data']['uploader']['avatar']['32px'];
            }
        )
    }, [])
    return (
        <Card sx={{ maxWidth: '400px' }}>
            {
                !loadingInfo ?
                    <>
                        <CardHeader
                            avatar={
                                !loadingAvatar ?
                                    <Avatar src={info['uploader']['avatar']['32px']} />
                                    :
                                    <Skeleton variant="circular" width={32} height={32} />
                            }
                            action={
                                <Tooltip title="转到Wallhaven">
                                    <a href={info['url']} target="_blank">
                                        <IconButton>
                                            <OpenInNewOutlinedIcon />
                                        </IconButton>
                                    </a>
                                </Tooltip>
                            }
                            title={info['uploader']['username']}
                            subheader={info['created_at']}
                        />
                        {
                            !loadingImage ? <CardMedia
                                component='img'
                                height='225'
                                image={info['thumbs']['large']}
                            /> :
                                <>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="circular" width={50} height={50} />
                                    <Skeleton variant="rectangular" width={400} height={40} />
                                    <Skeleton variant="rounded" width={400} height={50} />
                                </>
                        }
                        <CardContent>
                            <Typography variant="h5" component="div">
                                lalalalalalla
                            </Typography>
                            <Typography variant="h5" component="div">
                                lalalalalalla
                            </Typography>
                            <Typography variant="h5" component="div">
                                lalalalalalla
                            </Typography>
                            <Typography variant="h5" component="div">
                                lalalalalalla
                            </Typography>
                            <Typography variant="h5" component="div">
                                lalalalalalla
                            </Typography>
                            <Typography variant="h5" component="div">
                                lalalalalalla
                            </Typography>
                        </CardContent>
                    </> :
                    <>
                        <CardHeader
                            avatar={
                                <Skeleton variant="circular" width={32} height={32} />
                            }
                            action={
                                <Tooltip title="转到Wallhaven">
                                    <IconButton>
                                        <OpenInNewOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            title={<Skeleton variant="text" sx={{ width: '200px', fontSize: '1rem' }} />}
                            subheader={<Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                        />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="circular" width={50} height={50} />
                        <Skeleton variant="rectangular" width={400} height={40} />
                        <Skeleton variant="rounded" width={400} height={50} />
                        <CardContent>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </CardContent>
                    </>
            }

        </Card>
    )
}
