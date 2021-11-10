import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { editOngs } from '../../actions/Ong.actions';
import { RootState } from '../../store/store';
import { editSemaforo } from '../../actions/semaforo.actions';

export default function EditOngPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const investigaciones = useSelector((state : RootState) => state.home.investigaciones);
    let ong = props.history.location.state;
    const [selectedDate, setSelectedDate] = useState<Date | null>( moment(ong.fecha_creacion,"DD/MM/YYYY").toDate() );
    const [nombre,setNombre] = useState<any>(ong.ong);
    const [direccion,setDireccion] = useState<any>(ong.direccion);
    const [telefono,setTelefono] = useState<any>(ong.telefono);
    const [mail,setMail] = useState<any>(ong.mail);
    const [director,setDirector] = useState<any>(ong.director);
    const [ideologia,setIdeologia] = useState<any>(ong.ideologia);
    const [publicaciones,setPublicaciones] = useState<any>(ong.publicaciones);
    const [insta,setInsta] = useState<any>(ong.instagram);
    const [twit,setTwit] = useState<any>(ong.twitter);
    const [web,setWeb] = useState<any>(ong.web);
    const [fb,setFb] = useState<any>(ong.fb);
    const [marx,setMarx] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong.ong) return value}).filter((value,index)=>{ 
        if(index === 0){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);
    const [aborto,setAborto] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong.ong) return value}).filter((value,index)=>{ 
        if(index === 1){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);
    const [globalista,setGlobalista] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong.ong) return value}).filter((value,index)=>{ 
        if(index === 2){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);
    const [genero,setGenero] = useState<boolean>(investigaciones.filter((value)=> { if( value.ong === ong.ong) return value}).filter((value,index)=>{ 
        if(index === 3){
            return value.respuesta === "Si" ? true : false 
        }
    })[0]);

    const create = () => {
        let ong = {
            nombre : nombre,
            direccion : direccion,
            telefono : telefono,
            mail : mail,
            director : director,
            intagram : insta,
            twitter : twit,
            fb:fb,
            web : web,
            fechaCreacion : selectedDate?.toLocaleDateString(),
        };
        dispatch(editOngs(ong));
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
                    pregunta : "Ideologia de Género",
                    respuesta : genero?'Si':'NO'
                },
            ],
            relacion : '',
            fuente : '',
        };
        dispatch(editSemaforo(semaforo));
        props.history.replace("/ong");
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Editar ONG</b></h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField multiline={true} label="Nombre" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}} value={nombre} disabled={true}/>
                <TextField multiline={true} label="Direccion" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDireccion(event.target.value)}} value={direccion}/>
                <TextField multiline={true} label="Telefono" type="number" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTelefono(event.target.value)}} value={telefono}/>
                <TextField multiline={true} label="Correo Electronico" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value)}} value={mail}/>
                <TextField multiline={true} label="Director" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDirector(event.target.value)}} value={director}/>
                <TextField multiline={true} label="Ideologia" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setIdeologia(event.target.value)}} value={ideologia}/>
                <TextField multiline={true} label="Publicaciones" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPublicaciones(event.target.value)}} value={publicaciones}/>
                <TextField multiline={true} label="Instagram" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInsta(event.target.value)}} value={insta}/>
                <TextField multiline={true} label="Twitter" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTwit(event.target.value)}} value={twit}/>
                <TextField multiline={true} label="Facebook" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFb(event.target.value)}} value={fb}/>
                <TextField multiline={true} label="Sitio Web" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setWeb(event.target.value)}} value={web}/>
                <FormControl component="fieldset" className={classes.txt}>
                    <FormLabel component="legend">Investigación</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={marx} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMarx(event.target.checked)}}/>}
                            label="Es Marxista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={aborto} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAborto(event.target.checked)}} />}
                            label="Pro Aborto"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={globalista} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGlobalista(event.target.checked)}}/>}
                            label="Agenda Globalista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={genero} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGenero(event.target.checked)}}/>}
                            label="Ideologia de Género"
                        />
                    </FormGroup>
                </FormControl>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={create} > Guardar Cambios </Button>
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
        marginRight: 'auto'
    },
    txt: {
        marginTop: '2vh'
    }
}));