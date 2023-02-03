import React from 'react'
import { Box } from '@mui/material'

export default function ImageViewer(props) {
    const { meta } = props
    return (
        <>
            <Box fullwidth sx={{ height: '70vh', textAlign: 'center' }}>
                <img
                    src={meta['path']}
                    style={{
                        display: 'block',
                        margin: 'auto',
                        maxHeight: '90%',
                        maxWidth: '100%',
                        textAlign: 'center'
                    }} />
            </Box>
        </>
    )
}
