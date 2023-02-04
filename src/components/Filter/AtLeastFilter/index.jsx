import React, { useState } from 'react'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import PubSub from 'pubsub-js';
export default function AtLeastFilter() {
    const [atleast, setAtLeast] = useState(' ')
    return (
        <FormControl sx={{ margin: '10px 8px', width: '120px' }}>
            <InputLabel>最小尺寸</InputLabel>
            <Select
                label='最小尺寸'
                size='small'
                value={atleast}
                onChange={e => {
                    setAtLeast(e.target.value);
                    PubSub.publish('atleast', e.target.value);
                }}
            >
                <MenuItem value=' '>不限</MenuItem>
                <MenuItem value='1920x1080'>1080p</MenuItem>
                <MenuItem value='2560x1440'>2K</MenuItem>
                <MenuItem value='3840x2160'>4K</MenuItem>
            </Select>
        </FormControl>
    )
}
