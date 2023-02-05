import React, { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function ImageViewer(props) {
    const { meta } = props
    const [loading, setLoading] = useState(true);
    let image = new Image();
    image.src = meta['path'];
    image.onload = () => {
        setLoading(false);
    }
    return (
        !loading ?
            <img
                style={{
                    display: 'block',
                    maxHeight: 'calc(100vh - 64px - 56px)',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                src={meta['path']} />
            : <>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ position: 'fixed', marginTop: '200px' }} />
                </Box>
                <img
                    style={{
                        display: 'block',
                        maxHeight: 'calc(100vh - 64px - 56px)',
                        maxWidth: '100%',
                        height: meta['dimension_y'],
                        margin: 'auto'
                    }}
                    src={meta['thumbs']['original']} />

            </>
    )
}
