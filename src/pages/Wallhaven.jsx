import React from 'react'
import { Box } from '@mui/material'
import FilterBar from '../components/Filter/FilterBar'
import ImageList from '../components/Image/ImageList'
export default function Wallhaven() {
    return (
        <>
            <FilterBar />
            <ImageList />
        </>
    )
}
