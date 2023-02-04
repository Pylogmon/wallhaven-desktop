import React, { useState } from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import PubSub from 'pubsub-js';
export default function RatiosFilter() {
    const [ratios, setRatios] = useState(' ')
    return (
        <FormControl sx={{ margin: '10px 8px', width: '120px' }}>
            <InputLabel>比例</InputLabel>
            <Select
                label='比例'
                size='small'
                value={ratios}
                onChange={e => {
                    setRatios(e.target.value);
                    PubSub.publish('ratios', e.target.value);
                }}
            >
                <MenuItem value='landscape'>横版</MenuItem>
                <MenuItem value='1x1'>1:1</MenuItem>
                <MenuItem value='4x3'>4:3</MenuItem>
                <MenuItem value='5x4'>5:4</MenuItem>
                <MenuItem value='16x9'>16:9</MenuItem>
                <MenuItem value='16x10'>16:10</MenuItem>
                <MenuItem value='21x9'>21:9</MenuItem>
                <MenuItem value='32x9'>32:9</MenuItem>
                <MenuItem value='48x9'>48:9</MenuItem>
                <MenuItem value='portrait'>竖版</MenuItem>
                <MenuItem value='9x16'>9:16</MenuItem>
                <MenuItem value='9x18'>9:18</MenuItem>
                <MenuItem value='10x16'>10:16</MenuItem>
                <MenuItem value=' '>不限</MenuItem>
            </Select>
        </FormControl>
    )
}
