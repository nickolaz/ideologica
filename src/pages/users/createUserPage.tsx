import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/User.actions';

export default function CreateUserPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [username,setUsername] = useState<any>();
    const [nombre,setNombre] = useState<any>();
    const [password,setPassword] = useState<any>();
    const [tipo,setTipo] = useState<any>();

    const create = () => {
        let user = {
            username : username,
            nombre : nombre,
            password : password,
            tipo : tipo,
        };
        dispatch(createUser(user));
        props.history.replace("/users");
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Crear Usuario</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField label="Username" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUsername(event.target.value)}}/>
                <TextField label="Nombre" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}}/>
                <TextField label="password" type="password" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value)}}/>
                <InputLabel id="demo-simple-select-label" className={classes.txt}>Tipo de usuario</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={tipo} 
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => { setTipo(event.target.value ) }} >
                        <MenuItem value={'O'} >{'Operador'}</MenuItem>                         
                        <MenuItem value={'A'} >{'Administrador'}</MenuItem>
                </Select>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={create} > Crear </Button>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} onClick={()=>{ props.history.replace("/users")}} > Cancelar </Button>
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