import React, { useState, useEffect } from 'react'
import { Box, Button, InputBase } from '@mui/material'
import { useTheme } from '@emotion/react';
import SyncIcon from '@mui/icons-material/Sync';
import PubSub from 'pubsub-js'
import TypeFilter from '../TypeFilter'
import PurityFilter from '../PurityFilter'
import SortingFilter from '../SortingFilter'
import KeywordsFilter from '../KeywordsFilter'

export default function FilterBar() {
    const [search, setSearch] = useState({});
    const [categories, setCategories] = useState('100');
    const [purity, setPurity] = useState('110');
    const [sorting, setSorting] = useState('date_added');
    const [keywords, setKeywords] = useState('');

    PubSub.subscribe('categories', (_, v) => { setCategories(v) });
    PubSub.subscribe('purity', (_, v) => { setPurity(v) });
    PubSub.subscribe('sorting', (_, v) => { setSorting(v) });
    PubSub.subscribe('keywords', (_, v) => { setKeywords(v) });

    useEffect(() => {
        setSearch({ categories, purity, sorting, 'q': keywords });
    }, [categories, purity, sorting, keywords]);
    return (
        <Box sx={{ textAlign: 'center' }}>
            <TypeFilter />
            <PurityFilter />
            <KeywordsFilter />
            <Button
                sx={{ margin: '0px 8px' }}
                variant="contained"
                size='small'
                endIcon={<SyncIcon />}
                onClick={() => {
                    console.log(search)
                    PubSub.publish('search', search);
                }}
            >
                搜索
            </Button>
            <br />
            <SortingFilter />
        </Box>
    )
}
