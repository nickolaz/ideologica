import React, { useState } from 'react';
import Header from '../../components/header';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function ViewOngPage(props:any) {
    const classes = useStyles();
    let ong = props.history.location.state;
    const investigaciones = useSelector((state : RootState) => state.home.investigaciones);
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
    
    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>ONG</b></h2>
            <form className={classes.form} noValidate autoComplete="off" >
                <TextField multiline={true} label="Nombre" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNombre(event.target.value)}} value={nombre} disabled={true}/>
                <TextField multiline={true} label="Direccion" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDireccion(event.target.value)}} value={direccion} disabled={true}/>
                <TextField multiline={true} label="Telefono" type="number" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTelefono(event.target.value)}} value={telefono} disabled={true}/>
                <TextField multiline={true} label="Correo Electronico" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value)}} value={mail} disabled={true}/>
                <TextField multiline={true} label="Director" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDirector(event.target.value)}} value={director} disabled={true}/>
                <TextField multiline={true} label="Ideologia" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setIdeologia(event.target.value)}} value={ideologia} disabled={true}/>
                <Box style={{ borderBottom: '0.5px dotted' , borderColor: 'rgba(0, 0, 0, 0.38)'}}>
                    <Typography component="p" style={{color: 'rgba(0, 0, 0, 0.38)'}}>
                        Publicaciones
                    </Typography>
                    <a href={publicaciones.toString()} target="_blank" rel="noreferrer" className={classes.txt}>
                            {publicaciones.toString()}
                    </a>
                </Box>
                <TextField multiline={true} label="Instagram" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInsta(event.target.value)}} value={insta} disabled={true}/>
                <TextField multiline={true} label="Twitter" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTwit(event.target.value)}} value={twit} disabled={true}/>
                <TextField multiline={true} label="Facebook" className={classes.txt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFb(event.target.value)}} value={fb} disabled={true}/>
                <Box style={{ borderBottom: '0.5px dotted' , borderColor: 'rgba(0, 0, 0, 0.38)'}}>
                    <Typography component="p" style={{color: 'rgba(0, 0, 0, 0.38)'}}>
                        Sitio Web
                    </Typography>
                    <a href={web.toString()} target="_blank" rel="noreferrer" className={classes.txt}>
                            {web.toString()}
                    </a>
                </Box>
                <FormControl component="fieldset" className={classes.txt}>
                    <FormLabel component="legend">Investigación</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={marx} disabled={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMarx(event.target.checked)}}/>}
                            label="Es Marxista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={aborto} disabled={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAborto(event.target.checked)}} />}
                            label="Pro Aborto"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={globalista} disabled={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGlobalista(event.target.checked)}}/>}
                            label="Agenda Globalista"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={genero} disabled={true} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGenero(event.target.checked)}}/>}
                            label="Ideologia de Género"
                        />
                    </FormGroup>
                </FormControl>
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