import React, { useState, useEffect } from 'react'
import { Grid, Box, CircularProgress, Pagination } from '@mui/material';
import { useTheme } from '@emotion/react';
import { fetch } from '@tauri-apps/api/http';
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid';
import ImageCard from '../ImageCard';
import { get } from '../../../utils/config';

export default function ImageList(props) {
    const { type } = props;
    const [page, setPage] = useState('1');
    const [collect, setCollect] = useState(0);
    const [search, setSearch] = useState({});
    const [imgList, setImgList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { palette: { background } } = useTheme();
    useEffect(() => {
        setLoading(true)
        if (type === 'search') {
            fetch('https://wallhaven.cc/api/v1/search', {
                method: 'GET',
                timeout: 30,
                query: { ...search, ...{ apikey: get('apikey', ''), page } },
            }).then(
                res => {
                    if ('data' in res.data) {
                        setImgList(res.data);
                    } else {
                        setImgList([]);
                    }
                    setLoading(false);
                }
            )
        } else {
            const username = get('username', '');
            fetch(`https://wallhaven.cc/api/v1/collections/${username}/${collect}`, {
                method: 'GET',
                timeout: 30,
                query: { apikey: get('apikey', ''), page },
            }).then(
                res => {
                    if ('data' in res.data) {
                        setImgList(res.data);
                    } else {
                        setImgList([]);
                    }
                    setLoading(false);
                }
            )
        }
    }, [search, page, collect]);
    PubSub.subscribe('search', (_, v) => {
        setSearch({ ...v, ...{ 'seed': nanoid() } });
    })
    PubSub.subscribe('collect', (_, v) => {
        setCollect(v);
    })
    return (
        !loading ? (
            ('data' in imgList && imgList['data'].length !== 0) ?
                <>
                    <Grid container sx={{ justifyContent: 'space-around', height: 'calc(100vh - 166px)', overflow: 'auto', margin: '0 30px', width: 'calc(100% - 60px)' }} >
                        {
                            imgList['data'].map((x) => {
                                return (
                                    <Grid item key={nanoid()} xs='auto' >
                                        <ImageCard meta={x} />
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12} container sx={{
                            justifyContent: 'space-around'
                        }}>
                            <Pagination
                                count={imgList['meta']['last_page']}
                                defaultPage={imgList['meta']['current_page']}
                                color="primary"
                                onChange={(_, v) => { setPage(`${v}`) }}
                            />
                        </Grid>
                    </Grid >

                </>
                : <Grid container sx={{ justifyContent: 'space-around' }} >
                    <Grid item xs='auto' >
                        <h1 style={{ color: background.paper, margin: 'auto' }}>
                            ???????????????????????????
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
