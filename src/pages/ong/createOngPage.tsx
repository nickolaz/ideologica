import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { createOngs } from '../../actions/Ong.actions';

export default function CreateOngPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<Date | null>( new Date() );
    const [nombre,setNombre] = useState<any>();
    const [direccion,setDireccion] = useState<any>();
    const [telefono,setTelefono] = useState<any>();
    const [mail,setMail] = useState<any>();
    const [director,setDirector] = useState<any>();
    const [insta,setInsta] = useState<any>();
    const [twit,setTwit] = useState<any>();
    const [web,setWeb] = useState<any>();
    const [fb,setFb] = useState<any>();

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
            fechaCreacion : selectedDate?.toLocaleDateString(),
        };
        dispatch(createOngs(ong));
        props.history.replace("/ong");
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Crear ONG</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField label="Nombre" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}}/>
                <TextField label="Direccion" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDireccion(event.target.value)}}/>
                <TextField label="Telefono" type="number" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTelefono(event.target.value)}}/>
                <TextField label="Correo Electronico" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value)}}/>
                <TextField label="Director" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDirector(event.target.value)}}/>
                <TextField label="Instagram" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInsta(event.target.value)}}/>
                <TextField label="Twitter" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTwit(event.target.value)}}/>
                <TextField label="Facebook" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFb(event.target.value)}}/>
                <TextField label="Sitio Web" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setWeb(event.target.value)}}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" 
                        label="Fecha de Creacion" KeyboardButtonProps={{ 'aria-label': 'change date', }}  
                        onChange={(date: Date | null) => { setSelectedDate(date)}} value={selectedDate}/>
                </MuiPickersUtilsProvider>
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
        marginRight: 'auto'
    },
    txt: {
        marginTop: '2vh'
    }
}));