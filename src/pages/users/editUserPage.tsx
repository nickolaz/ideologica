import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editUser } from '../../actions/User.actions';

export default function EditUserPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let user = props.history.location.state;
    const [username,setUsername] = useState<any>(user.username);
    const [nombre,setNombre] = useState<any>(user.nombre);
    const [tipo,setTipo] = useState<any>(user.tipo);

    const create = () => {
        let user = {
            username : username,
            nombre : nombre,
            tipo : tipo[0],
        };
        dispatch(editUser(user));
        props.history.replace("/users");
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Editar Usuario</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField label="Username" className={classes.txt} value={username} disabled={true}/>
                <TextField label="Nombre" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}} value={nombre}/>
                <InputLabel id="demo-simple-select-label" className={classes.txt}>Tipo de usuario</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={tipo[0]} 
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => { setTipo(event.target.value ) }} >
                        <MenuItem value={'O'} >{'Operador'}</MenuItem>                         
                        <MenuItem value={'A'} >{'Administrador'}</MenuItem>
                </Select>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={create} > Guardar Cambios </Button>
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