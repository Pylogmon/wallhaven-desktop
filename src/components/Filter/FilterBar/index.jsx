import React, { useState, useEffect } from 'react'
import { Box, Button, InputBase } from '@mui/material'
import SyncIcon from '@mui/icons-material/Sync';
import PubSub from 'pubsub-js'
import TypeFilter from '../TypeFilter'
import PurityFilter from '../PurityFilter'
import SortingFilter from '../SortingFilter'

export default function FilterBar() {
    const [search, setSearch] = useState({});
    const [categories, setCategories] = useState('100');
    const [purity, setPurity] = useState('110');
    const [sorting, setSorting] = useState('date_added');
    const [keywords, setKeywords] = useState('');
    PubSub.subscribe('categories', (_, v) => { setCategories(v) });
    PubSub.subscribe('purity', (_, v) => { setPurity(v) });
    PubSub.subscribe('sorting', (_, v) => { setSorting(v) });
    useEffect(() => {
        setSearch({ categories, purity, sorting, 'q': keywords });
    }, [categories, purity, sorting, keywords]);
    return (
        <Box sx={{ textAlign: 'center' }}>
            <TypeFilter />
            <PurityFilter />
            <InputBase
                sx={{
                    borderBottom: '1px solid #464646',
                    borderRadius: '2px',
                    margin: '0px 8px'
                }}
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
                }}
            />
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
