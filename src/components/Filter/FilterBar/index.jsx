import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import SyncIcon from '@mui/icons-material/Sync';
import PubSub from 'pubsub-js'
import TypeFilter from '../TypeFilter'
import PurityFilter from '../PurityFilter'
import SortingFilter from '../SortingFilter'
import KeywordsFilter from '../KeywordsFilter'
import AtLeastFilter from '../AtLeastFilter';
import RatiosFilter from '../RatiosFilter';

export default function FilterBar() {
    const [search, setSearch] = useState({});
    const [categories, setCategories] = useState('100');
    const [purity, setPurity] = useState('110');
    const [sorting, setSorting] = useState('date_added');
    const [keywords, setKeywords] = useState('');
    const [atleast, setAtLeast] = useState('1920x1080');
    const [ratios, setRatios] = useState('');
    const [topRange, setTopRange] = useState('');

    PubSub.subscribe('categories', (_, v) => { setCategories(v) });
    PubSub.subscribe('purity', (_, v) => { setPurity(v) });
    PubSub.subscribe('sorting', (_, v) => { setSorting(v) });
    PubSub.subscribe('keywords', (_, v) => { setKeywords(v) });
    PubSub.subscribe('atleast', (_, v) => { setAtLeast(v) });
    PubSub.subscribe('ratios', (_, v) => { setRatios(v) });
    PubSub.subscribe('topRange', (_, v) => { setTopRange(v) });

    useEffect(() => {
        setSearch({ categories, purity, sorting, atleast, ratios, topRange, 'q': keywords });
    }, [categories, purity, sorting, keywords, atleast, ratios, topRange]);

    return (
        <>
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
                        PubSub.publish('search', search);
                    }}
                >
                    搜索
                </Button>
                <Box>
                    <SortingFilter />
                    <AtLeastFilter />
                    <RatiosFilter />
                </Box>
            </Box>

        </>
    )
}
