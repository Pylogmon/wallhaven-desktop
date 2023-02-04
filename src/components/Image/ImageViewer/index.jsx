import React from 'react'
import { Box } from '@mui/material'
import './style.css'

export default function ImageViewer(props) {
    const { meta } = props
    return (
        <Box>
            <img
                className='full-img'
                src={meta['path']} />
        </Box>
    )
}
