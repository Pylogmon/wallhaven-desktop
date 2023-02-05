import React from 'react'
import { Button, Grid } from '@mui/material';

export default function ColorBar(props) {
    const { colors } = props;
    return (
        <Grid container sx={{ justifyContent: 'space-around' }}>
            {
                colors.map(x => {
                    return <Grid item xs='auto' spacing={1}>
                        <Button fullwidth
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
