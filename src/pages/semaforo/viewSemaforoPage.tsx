import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOngs } from '../../actions/Ong.actions';
import { RootState } from '../../store/store';

export default function ViewSemaforoPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let semaforo = props.history.location.state;
    const ongs = useSelector((state : RootState) => state.home.ongs);
    const investigaciones = useSelector((state : RootState) => state.home.investigaciones);
    const [ong,setOng] = useState<any>(semaforo.ong);
    const [relacionOng,setRelacionOng] = useState<any>(semaforo.relacion);

    useEffect(() => {
        dispatch(getOngs());
    },[ongs.length,investigaciones.length]);
    
    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:"center"}}>Red</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <FormControl className={classes.txt}>
                    <InputLabel id="demo-simple-select-label">ONG</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={ong} 
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => { setOng(event.target.value ) }} disabled={true}>
                        { ongs.map((value,index)=>
                            <MenuItem value={value.nombre} key={index}>{value.nombre}</MenuItem> 
                        )}
                    </Select>
                </FormControl>
                <TextField label="Relaciones con otras ONGs" multiline={true} className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setRelacionOng(event.target.value)}} value={relacionOng} disabled={true}/>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} onClick={()=>{ props.history.replace("/semaforo")}} > Cerrar </Button>
                </div>
            </form>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    image: {
        marginLeft: '30vw',
        marginTop: '20vh'
    },
    form: {
        maxWidth: '350px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        padding: '20px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    txt: {
        marginTop: '2vh'
    }
}));