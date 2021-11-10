import * as React from "react"
import { AppBar, Toolbar , IconButton, List, ListItem, ListItemText, makeStyles, Container} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../actions/Home.actions";
import { clearOngs } from "../actions/Ong.actions";
import { RootState } from "../store/store";

const navLinks = [
    { title: `ONGs`, path: `/ong` },
    { title: `Redes`, path: `/semaforo` },
    { title: `Reportes`, path: `/reportes` },
    { title: `Usuarios`, path: `/users` },
]

const Header = (props :any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tipoLogeado = useSelector((state : RootState) => state.home.type);
    const userLogeado = useSelector((state : RootState) => state.home.userLogeado);

    return (
        <AppBar position="static" >
            <Toolbar>
                <Container className={classes.navbarDisplayFlex} >
                    <IconButton edge="start" color="inherit" aria-label="home" onClick={()=> props.history.replace("/home")}>
                        <Home fontSize="large" />
                    </IconButton>
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex} >
                        {navLinks.map(({ title, path }) => {
                            if(title === 'Usuarios'){
                                if(tipoLogeado === 'A'){
                                    return (
                                        <ListItem button onClick={()=> props.history.replace(path)} key={title}>
                                            <ListItemText primary={title} />
                                        </ListItem>
                                    );
                                }else{
                                    return (
                                        <ListItem button onClick={()=> props.history.replace("/users/changepass",userLogeado)} key={title}>
                                            <ListItemText primary={'Cambiar Clave'} />
                                        </ListItem>
                                    );
                                }
                            }else{
                                return (
                                    <ListItem button onClick={()=> props.history.replace(path)} key={title}>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                );
                            }
                        })}
                        <ListItem button onClick={() => { dispatch(clearOngs()); dispatch(clearAuth()); }}>
                            <ListItemText primary={'salir'} />
                        </ListItem>
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) =>({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
        [theme.breakpoints.down('sm')]: {
            overflowX: 'scroll',
        },
        [theme.breakpoints.down('md')]: {
            overflowX: 'scroll',
        },
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
}));

export default Header;