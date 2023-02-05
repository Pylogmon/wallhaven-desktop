import React, { useState } from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import PubSub from 'pubsub-js'

export default function SortingFilter() {
    const [sorting, setSorting] = useState('date_added')
    const [topRange, setTopRange] = useState('1M')
    return (
        <>
            <FormControl sx={{ margin: '10px 8px', width: '120px' }}>
                <InputLabel>排序</InputLabel>
                <Select
                    label='排序'
                    size='small'
                    value={sorting}
                    onChange={e => {
                        setSorting(e.target.value);
                        PubSub.publish('sorting', e.target.value);
                    }}
                >
                    <MenuItem value='relevance'>相关性</MenuItem>
                    <MenuItem value='views'>浏览量</MenuItem>
                    <MenuItem value='toplist'>排行榜</MenuItem>
                    <MenuItem value='favorites'>收藏量</MenuItem>
                    <MenuItem value='hot'>最热门</MenuItem>
                    <MenuItem value='date_added'>最新</MenuItem>
                    <MenuItem value='random'>随机</MenuItem>
                </Select>
            </FormControl>
            {
                sorting == 'toplist' ?
                    <FormControl sx={{ margin: '10px 8px', width: '120px' }}>
                        <InputLabel>期限</InputLabel>
                        <Select
                            label='期限'
                            size='small'
                            value={topRange}
                            onChange={e => {
                                setTopRange(e.target.value);
                                PubSub.publish('topRange', e.target.value);
                            }}
                        >
                            <MenuItem value='1d'>近一天</MenuItem>
                            <MenuItem value='3d'>近三天</MenuItem>
                            <MenuItem value='1w'>近一周</MenuItem>
                            <MenuItem value='1M'>近一月</MenuItem>
                            <MenuItem value='3M'>近三月</MenuItem>
                            <MenuItem value='6M'>近六月</MenuItem>
                            <MenuItem value='1y'>近一年</MenuItem>
                        </Select>
                    </FormControl>
                    :
                    <></>
            }
        </>
    )
}
