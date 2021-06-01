import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import semaforo from '../assets/semaforo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login , error, labelerror} from '../actions/Home.actions';
import { RootState } from '../store/store';

export default function LoginPage (props : any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user,setUser] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const errorflag = useSelector((state : RootState) => state.home.error);
    const errorLabel = useSelector((state : RootState) => state.home.labelError);

    const userHandleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    };

    const passHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if ( user.trim() !== '' || password.trim() !== '' ) {
            const loginDto = {
                user: user,
                password: password
            };
            dispatch(error(false));
            dispatch(labelerror(""));
            dispatch(login(loginDto,props.history));
        }else{
            dispatch(error(true));
            dispatch(labelerror("Ingrese su Usuario y Contraseña"));
        }
    };

    return (
        <Box>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={(e)=>{
                e.preventDefault();
                handleLogin();
            }}>
                <Box style={{marginRight:'auto',marginLeft:'auto'}}>
                    <img src={semaforo} className={classes.image} alt="semaforo"/>
                    <h2 style={{marginLeft:'10px'}}> LOGIN </h2>
                </Box>
                <TextField id="user" label="Usuario" style={{marginBottom: '10px'}} onChange={userHandleChange} error={errorflag}/>
                <TextField id="password" label="Contraseña" type="password" autoComplete="current-password" onChange={passHandleChange} error={errorflag} helperText={errorLabel}/>
                <Button variant="contained" color="primary" type="submit" style={{marginTop: '30px'}}> Ingresar </Button>
            </form>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    form: {
      maxWidth: '330px',
      margin: '20vh auto',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      padding: '20px',
      border: '0.5px solid black'
    },
    image: {
        height: '100px',
        width: '100px'
    }
}));