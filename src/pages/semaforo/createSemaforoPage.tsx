import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Button, Checkbox, FormControl, FormLabel, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOngs } from '../../actions/Ong.actions';
import { RootState } from '../../store/store';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createSemaforo } from '../../actions/semaforo.actions';

export default function CreateSemaforoPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ong,setOng] = useState<any>();
    const ongs = useSelector((state : RootState) => state.home.ongs);
    const [ideologia,setIdeologia] = useState<any>();
    const [publicaciones,setPublicaciones] = useState<any>();
    const [relacionOng,setRelacionOng] = useState<any>();
    const [fuente,setFuente] = useState<any>();
    const [marx,setMarx] = useState<boolean>();
    const [aborto,setAborto] = useState<boolean>();
    const [globalista,setGlobalista] = useState<boolean>();
    const [genero,setGenero] = useState<boolean>();

    useEffect(() => {
        dispatch(getOngs());
    },[ongs.length]);

    const create = () => {
        let semaforo = {
            ong : ong,
            ideologia : ideologia,
            publicaciones : publicaciones,
            investigacion : [
                {
                    ong : ong,
                    pregunta : "Es marcista",
                    respuesta : marx?'Si':'NO'
                },
                {
                    ong : ong,
                    pregunta : "Pro aborto",
                    respuesta : aborto?'Si':'NO'
                },
                {
                    ong : ong,
                    pregunta : "Agenda Globalista",
                    respuesta : globalista?'Si':'NO'
                },
                {
                    ong : ong,
                    pregunta : "Ideologia de Género",
                    respuesta : genero?'Si':'NO'
                },
            ],
            relacion : relacionOng,
            fuente : fuente,
        };
        dispatch(createSemaforo(semaforo));
        props.history.replace("/semaforo");
    };
    
    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Crear Semaforo</b>
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
                <TextField label="Ideologia" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setIdeologia(event.target.value)}}/>
                <TextField label="Publicaciones" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPublicaciones(event.target.value)}}/>
                <FormControl component="fieldset" className={classes.txt}>
                    <FormLabel component="legend">Investigación</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={marx} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMarx(event.target.checked)}} />}
                            label="Es Marxista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={aborto} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAborto(event.target.checked)}} />}
                            label="Pro Aborto"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={globalista} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGlobalista(event.target.checked)}} />}
                            label="Agenda Globalista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={genero} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGenero(event.target.checked)}} />}
                            label="Ideologia de Género"
                        />
                    </FormGroup>
                </FormControl>
                <TextField label="Relaciones con otras ONGs" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setRelacionOng(event.target.value)}}/>
                <TextField label="Fuente" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFuente(event.target.value)}}/>
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