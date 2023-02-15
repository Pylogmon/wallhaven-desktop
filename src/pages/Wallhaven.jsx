import React from 'react'
import FilterBar from '../components/Filter/FilterBar'
import ImageList from '../components/Image/ImageList'
export default function Wallhaven() {
    return (
        <>
            <FilterBar />
            <ImageList type='search' />
        </>
    )
}
