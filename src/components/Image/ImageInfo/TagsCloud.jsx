import React from 'react'
import { Chip, Box } from '@mui/material';
import randomColor from 'randomcolor';
import { nanoid } from 'nanoid';

export default function TagsCloud(props) {
    const { tags } = props;
    return (
        <Box sx={{ marginBottom: '60px' }}>
            {
                tags.map(x => {
                    var color = randomColor({ luminosity: 'light' });
                    return <Chip
                        key={nanoid()}
                        label={x['name']}
                        variant="outlined"
                        sx={{ color: color, margin: '5px', borderColor: color }}
                    />
                })
            }
        </Box>
    )
}
