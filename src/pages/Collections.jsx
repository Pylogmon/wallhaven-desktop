import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetch } from '@tauri-apps/api/http';
import ImageList from '../components/Image/ImageList';
import { get } from '../utils/config';
import { nanoid } from 'nanoid';
import PubSub from 'pubsub-js';

export default function Collections() {
    const [collect, setCollect] = useState(0);
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch('https://wallhaven.cc/api/v1/collections', {
            method: 'GET',
            timeout: 30,
            query: { apikey: get('apikey', '') },
        }).then(
            res => {
                if ('data' in res.data) {
                    setCollections(res.data['data']);
                    setCollect(res.data['data'][0]['id'])
                    PubSub.publish('collect', res.data['data'][0]['id']);
                }
            }
        )
    }, [])
    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <FormControl sx={{ margin: '10px 8px', width: '120px' }}>
                    <InputLabel>收藏夹</InputLabel>
                    <Select
                        label='收藏夹'
                        size='small'
                        value={collect}
                        onChange={e => {
                            setCollect(e.target.value);
                            PubSub.publish('collect', e.target.value);
                        }}
                    >
                        {
                            collections.map(x => {
                                return <MenuItem key={nanoid()} value={x['id']}>{x['label']}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
            <ImageList type='collections' />
        </>
    )
}
