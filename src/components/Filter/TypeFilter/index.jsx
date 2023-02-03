import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from '@mui/material';
import PubSub from 'pubsub-js'

export default function TypeFilter() {
    const [general, setGeneral] = useState(1);
    const [anime, setAnime] = useState(0);
    const [people, setPeople] = useState(0);

    useEffect(() => {
        const categories = `${general}${anime}${people}`;
        PubSub.publish('categories', categories);
    }, [general, anime, people]);

    return (
        <>
            <ButtonGroup sx={{ margin: '0px 8px' }} size='small'>
                <Button
                    variant={general ? 'contained' : 'outlined'}
                    onClick={() => {
                        setGeneral(general ? 0 : 1);
                    }}
                >常规</Button>
                <Button
                    variant={anime ? 'contained' : 'outlined'}
                    onClick={() => {
                        setAnime(anime ? 0 : 1);
                    }}
                >动漫</Button>
                <Button
                    variant={people ? 'contained' : 'outlined'}
                    onClick={() => {
                        setPeople(people ? 0 : 1);
                    }}
                >人物</Button>
            </ButtonGroup>
        </>
    )
}
