import React, { useState, useEffect } from 'react'
import { Grid, Box, Skeleton } from '@mui/material';
import { fetch } from '@tauri-apps/api/http';
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid';
import ImageCard from '../ImageCard';

export default function ImageList() {
    const [search, setSearch] = useState({});
    const [imgList, setImgList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (search.length !== 0) {
            console.log("fetch", search)
            setLoading(true)
            fetch('https://wallhaven.cc/api/v1/search', {
                method: 'GET',
                timeout: 30,
                query: search,
            }).then(
                res => {
                    setLoading(false);
                    setImgList(res.data['data']); console.log(res.data.data);
                }
            )
            // setSearch({});
        } else {
            return
        }
    }, [search]);
    PubSub.subscribe('search', (_, v) => {
        setSearch(v);
    })
    return (
        !loading ?
            <Grid container sx={{ justifyContent: 'space-around' }} >
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
            : <Box sx={{ textAlign: 'center', justifyContent: 'space-around' }}>
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="rectangular" height={60} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="rounded" height={60} />
            </Box>
    )
}
