import React from 'react'
import { Chip, Box } from '@mui/material';
import randomColor from 'randomcolor';

export default function TagsCloud(props) {
    const { tags } = props;
    return (
        <Box sx={{ marginBottom: '60px' }}>
            {
                tags.map(x => {
                    var color = randomColor({ luminosity: 'light' });
                    return <Chip
                        label={x['name']}
                        variant="outlined"
                        sx={{ color: color, margin: '5px', borderColor: color }}
                    />
                })
            }
        </Box>
    )
}
