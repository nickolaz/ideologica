import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

export default function ViewOngPage(props:any) {
    const classes = useStyles();
    let ong = props.history.location.state;
    const [selectedDate, setSelectedDate] = useState<Date | null>( moment(ong.fecha_creacion,"DD/MM/YYYY").toDate() );
    const [nombre,setNombre] = useState<any>(ong.nombre);
    const [direccion,setDireccion] = useState<any>(ong.direccion);
    const [telefono,setTelefono] = useState<any>(ong.telefono);
    const [mail,setMail] = useState<any>(ong.mail);
    const [director,setDirector] = useState<any>(ong.director);
    const [insta,setInsta] = useState<any>(ong.instagram);
    const [twit,setTwit] = useState<any>(ong.twitter);
    const [contacto,setContacto] = useState<any>(ong.contacto);
    const [web,setWeb] = useState<any>(ong.web);

    return (
        <div>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'4rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto'}}>ONG</b></h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField label="Nombre" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}} value={nombre} disabled={true}/>
                <TextField label="Direccion" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDireccion(event.target.value)}} value={direccion} disabled={true}/>
                <TextField label="Telefono" type="number" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTelefono(event.target.value)}} value={telefono} disabled={true}/>
                <TextField label="Correo Electronico" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value)}} value={mail} disabled={true}/>
                <TextField label="Director" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDirector(event.target.value)}} value={director} disabled={true}/>
                <TextField label="Instagram" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInsta(event.target.value)}} value={insta} disabled={true}/>
                <TextField label="Twitter" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTwit(event.target.value)}} value={twit} disabled={true}/>
                <TextField label="Contacto" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setContacto(event.target.value)}} value={contacto} disabled={true}/>
                <TextField label="Sitio Web" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setWeb(event.target.value)}} value={web} disabled={true}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" 
                        label="Fecha de Creacion" KeyboardButtonProps={{ 'aria-label': 'change date', }}  
                        onChange={(date: Date | null) => { setSelectedDate(date)}} value={selectedDate} disabled={true}/>
                </MuiPickersUtilsProvider>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} onClick={()=>{ props.history.replace("/ong")}} > Cerrar </Button>
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