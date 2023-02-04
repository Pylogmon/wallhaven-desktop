import React, { useState } from 'react'
import { InputBase, Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import PubSub from 'pubsub-js';

export default function KetwordsFilter() {
    const [_keywords, setKeywords] = useState('');
    const { palette: { background } } = useTheme();
    return (
        <Box
            sx={{
                display: 'inline-block',
                borderRadius: '5px',
                margin: '0px 8px',
                backgroundColor: background.paper,
                width: '150px'
            }}
        >
            <InputBase
                sx={{ margin: '0px 8px' }}
                placeholder="搜索"
                onChange={e => {
                    let temp = e.target.value;
                    temp = temp.replace(/\%/g, '%25');
                    temp = temp.replace(/\+/g, '%2b');
                    temp = temp.replace(/\//g, '%2f');
                    temp = temp.replace(/\s+/g, '+');
                    temp = temp.replace(/\&/g, '%26');
                    temp = temp.replace(/\?/g, '%3f');
                    temp = temp.replace(/\#/g, '%23');
                    temp = temp.replace(/\=/g, '%3d');
                    setKeywords(temp);
                    PubSub.publish('keywords', temp);
                }}
            />
        </Box>
    )
}
