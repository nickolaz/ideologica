import React from 'react';
import Header from '../components/header';
import semaforo from '../assets/semaforo.jpg';
import { makeStyles } from '@material-ui/core';

export default function HomePage (props:any) {
    const classes = useStyles();

    return (
        <div>
            <Header history={props.history}/>
            <img src={semaforo} className={classes.image} alt="semaforo"/>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    image: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20vh'
    }
}));