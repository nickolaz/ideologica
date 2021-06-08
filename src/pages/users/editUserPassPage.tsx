import React, { useState } from 'react';
import Header from '../../components/header';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editPassUser } from '../../actions/User.actions';

export default function EditUserPassPage(props:any) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let user = props.history.location.state;
    const [username,setUsername] = useState<any>(user.username);
    const [password,setPassword] = useState<any>(user.nombre);
    const [newpassword,setNewPassword] = useState<any>(user.tipo);

    const create = () => {
        let user = {
            username : username,
            pass : password,
            newpass : newpassword,
        };
        dispatch(editPassUser(user));
        props.history.replace("/users");
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Cambiar Contraseña</b>
            </h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField label="Username" className={classes.txt} value={username} disabled={true}/>
                <TextField label="password actual" type="password" className={classes.txt} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value)}}/>
                <TextField label="nuevo password" type="password" className={classes.txt} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewPassword(event.target.value)}}/>
                <div style={{marginTop:'5%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={create} > cambiar </Button>
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