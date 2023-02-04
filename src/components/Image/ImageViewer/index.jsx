import React from 'react'
import { Box } from '@mui/material'

export default function ImageViewer(props) {
    const { meta } = props
    return (
        <Box>
            <img
                style={{
                    display: 'block',
                    maxHeight: 'calc(100vh - 64px - 56px)',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                className='full-img'
                src={meta['path']} />
        </Box>
    )
}
