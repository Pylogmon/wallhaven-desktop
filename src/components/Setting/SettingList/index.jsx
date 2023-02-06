import React from 'react'
import { Paper } from '@mui/material'
export default function SettingList(props) {
    const { children } = props;
    return (
        <Paper sx={{ width: '100%', margin: '8px 0' }} children={children} />
    )
}
