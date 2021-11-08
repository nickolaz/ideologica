import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Box, Button, Checkbox, FormControl, FormLabel, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOngs } from '../../actions/Ong.actions';
import { RootState } from '../../store/store';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function ViewSemaforoPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let semaforo = props.history.location.state;
    const ongs = useSelector((state : RootState) => state.home.ongs);
    const investigaciones = useSelector((state : RootState) => state.home.investigaciones);
    const [ong,setOng] = useState<any>(semaforo.ong);
    const [ideologia,setIdeologia] = useState<any>(semaforo.ideologia);
    const [publicaciones,setPublicaciones] = useState<any>(semaforo.publicaciones);
    const [relacionOng,setRelacionOng] = useState<any>(semaforo.relacion);
    const [fuente,setFuente] = useState<any>(semaforo.fuente);
    const [marx,setMarx] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong) return value}).filter((value,index)=>{ 
        if(index === 0){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);
    const [aborto,setAborto] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong) return value}).filter((value,index)=>{ 
        if(index === 1){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);
    const [globalista,setGlobalista] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong) return value}).filter((value,index)=>{ 
        if(index === 2){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);
    const [genero,setGenero] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong) return value}).filter((value,index)=>{ 
        if(index === 3){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);

    useEffect(() => {
        dispatch(getOngs());
    },[ongs.length,investigaciones.length]);
    
    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:"center"}}>Semaforo</b>
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
                <TextField label="Ideologia" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setIdeologia(event.target.value)}} value={ideologia} disabled={true}/>
                <Box style={{ borderBottom: '0.5px dotted' , borderColor: 'rgba(0, 0, 0, 0.38)'}}>
                    <Typography component="p" style={{color: 'rgba(0, 0, 0, 0.38)'}}>
                        Publicaciones
                    </Typography>
                    <a href={publicaciones.toString()} target="_blank" rel="noreferrer" className={classes.txt}>
                            {publicaciones.toString()}
                    </a>
                </Box>
                <FormControl component="fieldset" className={classes.txt}>
                    <FormLabel component="legend">Investigación</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={marx} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMarx(event.target.checked)}} disabled={true}/>}
                            label="Es Marxista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={aborto} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAborto(event.target.checked)}} disabled={true}/>}
                            label="Pro Aborto"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={globalista} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGlobalista(event.target.checked)}} disabled={true}/>}
                            label="Agenda Globalista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={genero} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGenero(event.target.checked)}} disabled={true}/>}
                            label="Ideologia de Género"
                        />
                    </FormGroup>
                </FormControl>
                <TextField label="Relaciones con otras ONGs" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setRelacionOng(event.target.value)}} value={relacionOng} disabled={true}/>
                <Box style={{ borderBottom: '0.5px dotted' , borderColor: 'rgba(0, 0, 0, 0.38)'}}>
                    <Typography component="p" style={{color: 'rgba(0, 0, 0, 0.38)'}}>
                        Fuente
                    </Typography>
                    <a href={fuente.toString()} target="_blank" rel="noreferrer" className={classes.txt}>
                            {fuente.toString()}
                    </a>
                </Box>
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