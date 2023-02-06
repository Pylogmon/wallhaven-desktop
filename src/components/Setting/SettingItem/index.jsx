import React, { Fragment } from 'react'
import { Box } from '@mui/material';
export default function SettingItem(props) {
    const { children, label } = props;
    return (
        <Box sx={{ width: '100%', padding: '5px 16px', display: 'flex', justifyContent: "space-between" }}>
            <Box style={{ margin: '4px 0', fontSize: 20, backgroundColor: 'None' }}>{label}</Box>
            <Fragment children={children} />
        </Box>
    )
}
