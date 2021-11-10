import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOngs } from '../../actions/Ong.actions';
import { RootState } from '../../store/store';
import { editSemaforo, getSemaforos } from '../../actions/semaforo.actions';

export default function CreateSemaforoPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ong,setOng] = useState<any>();
    const [ongRelacion,setOngRelacion] = useState<any>();
    const ongs = useSelector((state : RootState) => state.home.ongs);
    const semaforos = useSelector((state : RootState) => state.home.semaforos);

    useEffect(() => {
        dispatch(getOngs());
        dispatch(getSemaforos());
    },[ongs.length]);

    const create = () => {
        let sem = semaforos.find(s => s.ong === ong);
        let relacionx = sem.relacion.length > 0 ? ( sem.relacion + ',' + ongRelacion )  : ongRelacion;
        sem.relacion = relacionx; 
        dispatch(editSemaforo(sem));
        props.history.replace("/semaforo");
    };
    
    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Crear Red</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <FormControl className={classes.txt}>
                    <InputLabel id="demo-simple-select-label" >ONG</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={ong} 
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => { setOng(event.target.value ) }} >
                        { ongs.map((value,index)=>
                            <MenuItem value={value.nombre} key={index}>{value.nombre}</MenuItem> 
                        )}
                    </Select>
                </FormControl>
                <FormControl className={classes.txt}>
                    <InputLabel id="demo-simple-select-label" >ONG Relacionada</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={ong} 
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => { setOngRelacion(event.target.value ) }} >
                        { ongs.map((value,index)=>
                            <MenuItem value={value.nombre} key={index}>{value.nombre}</MenuItem> 
                        )}
                    </Select>
                </FormControl>
                {/* <TextField label="Relaciones con otras ONGs" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setRelacionOng(event.target.value)}}/> */}
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={create} > Crear </Button>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} onClick={()=>{ props.history.replace("/semaforo")}} > Cancelar </Button>
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