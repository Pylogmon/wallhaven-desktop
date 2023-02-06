import React, { useState, useEffect } from 'react'
import { Avatar, Card, CardHeader, Box, CardContent, IconButton, Skeleton, Typography, Tooltip, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { fetch } from '@tauri-apps/api/http';
import ColorBar from './ColorBar';
import TagsCloud from './TagsCloud';

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
                image.src = res.data['data']['thumbs']['original'];
                avatar.src = res.data['data']['uploader']['avatar']['32px'];
            }
        )
    }, [])
    return (
        <Card sx={{ width: '400px' }}>
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
                                <>
                                    <Tooltip title="转到Wallhaven">
                                        <a href={info['url']} target="_blank">
                                            <IconButton>
                                                <OpenInNewOutlinedIcon />
                                            </IconButton>
                                        </a>
                                    </Tooltip>
                                    <Tooltip title="关闭">
                                        <IconButton onClick={() => { setOpenInfo(false) }}>
                                            <CloseOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                            title={info['uploader']['username']}
                            subheader={info['created_at']}
                        />
                        {
                            !loadingImage ?
                                <Box sx={{ margin: 0 }}>
                                    <img style={{
                                        display: 'block',
                                        maxHeight: '30vh',
                                        maxWidth: '100%',
                                        margin: 'auto'
                                    }}
                                        src={info['thumbs']['original']} />
                                </Box>
                                :
                                <>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="circular" width={50} height={50} />
                                    <Skeleton variant="rectangular" width={400} height={40} />
                                    <Skeleton variant="rounded" width={400} height={50} />
                                </>
                        }
                        <Box sx={{ textAlign: 'center' }}>
                            <Chip sx={{ background: 'none' }} icon={<VisibilityIcon />} label={info['views']} />
                            <Chip sx={{ background: 'none' }} icon={<FavoriteIcon />} label={info['favorites']} />
                        </Box>
                        <ColorBar colors={info['colors']} />
                        <CardContent sx={{ height: '50vh', overflow: 'auto', textAlign: 'center' }}>

                            <Typography variant="h6" component="div">
                                基本信息
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                尺寸: {info['resolution']}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                大小: {(Number(info['file_size']) / 1048576).toFixed(2)}M
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                格式: {info['file_type']}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                分类: {info['category']}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                分级: {info['purity']}
                            </Typography>
                            <Typography variant="h6" component="div">
                                标签
                            </Typography>
                            <TagsCloud tags={info['tags']} />
                        </CardContent>
                    </> :
                    <>
                        <CardHeader
                            avatar={
                                <Skeleton variant="circular" width={32} height={32} />
                            }
                            action={
                                <>
                                    <Tooltip title="转到Wallhaven">
                                        <IconButton>
                                            <OpenInNewOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="关闭">
                                        <IconButton onClick={() => { setOpenInfo(false) }}>
                                            <CloseOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
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
