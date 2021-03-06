import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createOngs } from '../../actions/Ong.actions';
import { createSemaforo } from '../../actions/semaforo.actions';

export default function CreateOngPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [nombre,setNombre] = useState<any>();
    const [direccion,setDireccion] = useState<any>();
    const [telefono,setTelefono] = useState<any>();
    const [mail,setMail] = useState<any>();
    const [director,setDirector] = useState<any>();
    const [ideologia,setIdeologia] = useState<any>();
    const [publicaciones,setPublicaciones] = useState<any>();
    const [insta,setInsta] = useState<any>();
    const [twit,setTwit] = useState<any>();
    const [fb,setFb] = useState<any>();
    const [web,setWeb] = useState<any>();
    const [marx,setMarx] = useState<boolean>();
    const [aborto,setAborto] = useState<boolean>();
    const [globalista,setGlobalista] = useState<boolean>();
    const [genero,setGenero] = useState<boolean>();
    
    const create = () => {
        let ong = {
            nombre : nombre,
            direccion : direccion,
            telefono : telefono,
            mail : mail,
            director : director,
            intagram : insta,
            twitter : twit,
            fb: fb,
            web : web,
            fechaCreacion : (new Date()).toLocaleDateString(),
        };
        dispatch(createOngs(ong));
        let semaforo = {
            ong : nombre,
            ideologia : ideologia,
            publicaciones : publicaciones,
            investigacion : [
                {
                    ong : nombre,
                    pregunta : "Es marcista",
                    respuesta : marx?'Si':'NO'
                },
                {
                    ong : nombre,
                    pregunta : "Pro aborto",
                    respuesta : aborto?'Si':'NO'
                },
                {
                    ong : nombre,
                    pregunta : "Agenda Globalista",
                    respuesta : globalista?'Si':'NO'
                },
                {
                    ong : nombre,
                    pregunta : "Ideologia de G??nero",
                    respuesta : genero?'Si':'NO'
                },
            ],
            relacion : '',
            fuente : '',
        };
        dispatch(createSemaforo(semaforo));
        props.history.replace("/ong");
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'0', marginTop: '1vh'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Crear ONG</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField multiline={true} label="Nombre" className={classes.txt} style={{ marginTop: 0}} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}}/>
                <TextField multiline={true} label="Direccion" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDireccion(event.target.value)}}/>
                <TextField multiline={true} label="Telefono" type="number" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTelefono(event.target.value)}}/>
                <TextField multiline={true} label="Correo Electronico" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value)}}/>
                <TextField multiline={true} label="Director" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDirector(event.target.value)}}/>
                <TextField multiline={true} label="Ideologia" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setIdeologia(event.target.value)}}/>
                <TextField multiline={true} label="Publicaciones" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPublicaciones(event.target.value)}}/>
                <TextField multiline={true} label="Instagram" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInsta(event.target.value)}}/>
                <TextField multiline={true} label="Twitter" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTwit(event.target.value)}}/>
                <TextField multiline={true} label="Facebook" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFb(event.target.value)}}/>
                <TextField multiline={true} label="Sitio Web" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setWeb(event.target.value)}}/>
                <FormControl component="fieldset" className={classes.txt}>
                    <FormLabel component="legend">Investigaci??n</FormLabel>
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
                            label="Ideologia de G??nero"
                        />
                    </FormGroup>
                </FormControl>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={create} > Crear </Button>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} onClick={()=>{ props.history.replace("/ong")}} > Cancelar </Button>
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
        marginRight: 'auto',
        marginTop:'0'
    },
    txt: {
        marginTop: '2vh'
    }
}));