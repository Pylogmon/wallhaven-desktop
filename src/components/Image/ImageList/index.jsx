import React, { useState, useEffect } from 'react'
import { Grid, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { fetch } from '@tauri-apps/api/http';
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid';
import ImageCard from '../ImageCard';

export default function ImageList() {
    const [search, setSearch] = useState({});
    const [imgList, setImgList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { palette: { background } } = useTheme();
    useEffect(() => {
        console.log("fetch", search)
        setLoading(true)
        fetch('https://wallhaven.cc/api/v1/search', {
            method: 'GET',
            timeout: 30,
            query: search,
        }).then(
            res => {
                setImgList(res.data['data']); console.log(res.data.data);
                setLoading(false);
            }
        )
    }, [search]);
    PubSub.subscribe('search', (_, v) => {
        setSearch(v);
    })
    return (
        !loading ? (
            imgList.length !== 0 ?
                <Grid container className='img-list' sx={{ justifyContent: 'space-around', height: 'calc(100vh - 150px)', overflow: 'auto' }} >
                    {
                        imgList.map((x) => {
                            return (
                                <Grid item key={nanoid()} xs='auto' >
                                    <ImageCard meta={x} />
                                </Grid>
                            )
                        })
                    }
                </Grid >
                : <Grid container sx={{ justifyContent: 'space-around' }} >
                    <Grid item xs='auto' >
                        <h1 style={{ color: background.paper, margin: 'auto' }}>
                            没有符合条件的结果
                        </h1>
                    </Grid>
                </Grid >
        )
            : <Box sx={{
                textAlign: 'center',
            }}>
                <CircularProgress />
            </Box>
    )
}
