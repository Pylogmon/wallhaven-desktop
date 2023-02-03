import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import PubSub from 'pubsub-js'

export default function SortingFilter() {
    const [sorting, setSorting] = useState('date_added')
    return (
        <FormControl>
            <Select
                size='small'
                value={sorting}
                onChange={e => {
                    setSorting(e.target.value);
                    PubSub.publish('sorting', e.target.value);
                }}
                sx={{ margin: '5px 8px', width: '120px' }}
            >
                <MenuItem value='relevance'>相关性</MenuItem>
                <MenuItem value='views'>浏览量</MenuItem>
                <MenuItem value='toplest'>排行榜</MenuItem>
                <MenuItem value='favourite'>最喜欢</MenuItem>
                <MenuItem value='random'>随机</MenuItem>
                <MenuItem value='date_added'>日期</MenuItem>
                <MenuItem value='hot'>热门</MenuItem>
            </Select>
        </FormControl>
    )
}
