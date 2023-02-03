import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from '@mui/material';
import PubSub from 'pubsub-js'

export default function PurityFilter() {
    const [sfw, setSfw] = useState(1);
    const [sketchy, setSketchy] = useState(0);
    const [nsfw, setNsfw] = useState(0);

    useEffect(() => {
        const purity = `${sfw}${sketchy}${nsfw}`;
        PubSub.publish('purity', purity);
    }, [sfw, sketchy, nsfw]);

    return (
        <>
            <ButtonGroup sx={{ margin: '0px 8px' }} size='small'>
                <Button
                    color='success'
                    variant={sfw ? 'contained' : 'outlined'}
                    onClick={() => {
                        setSfw(sfw ? 0 : 1);
                    }}
                >SFW</Button>
                <Button
                    color='warning'
                    variant={sketchy ? 'contained' : 'outlined'}
                    onClick={() => {
                        setSketchy(sketchy ? 0 : 1);
                    }}
                >Sketchy</Button>
                <Button
                    color='error'
                    variant={nsfw ? 'contained' : 'outlined'}
                    onClick={() => {
                        setNsfw(nsfw ? 0 : 1);
                    }}
                >NSFW</Button>
            </ButtonGroup>
        </>
    )
}
