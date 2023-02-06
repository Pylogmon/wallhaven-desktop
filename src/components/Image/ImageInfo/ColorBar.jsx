import React from 'react'
import { Button, Grid } from '@mui/material';
import { nanoid } from 'nanoid';

export default function ColorBar(props) {
    const { colors } = props;
    return (
        <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
            {
                colors.map(x => {
                    return <Grid item xs='auto' key={nanoid()}>
                        <Button
                            sx={{
                                backgroundColor: x,
                                height: '10px',
                                ":hover": {
                                    backgroundColor: x,
                                    height: '20px'
                                }
                            }}
                        />
                    </Grid>
                })
            }
        </Grid >
    )
}
