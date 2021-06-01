import * as React from "react"
import { AppBar, Toolbar , IconButton, List, ListItem, ListItemText, makeStyles, Container} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { clearAuth } from "../actions/Home.actions";
import { clearOngs } from "../actions/Ong.actions";

const navLinks = [
    { title: `Semaforo`, path: `/semaforo` },
    { title: `ONGs`, path: `/ong` },
    { title: `Reportes`, path: `/reportes` },
    // { title: `Usuarios`, path: `/users` },
]

const Header = (props :any) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
        <Toolbar>
            <Container className={classes.navbarDisplayFlex} >
                <IconButton edge="start" color="inherit" aria-label="home" onClick={()=> props.history.replace("/home")}>
                    <Home fontSize="large" />
                </IconButton>
                <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex} >
                    {navLinks.map(({ title, path }) => (
                        <ListItem button onClick={()=> props.history.replace(path)} key={title}>
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                    <ListItem button onClick={() => { dispatch(clearOngs()); dispatch(clearAuth()); }}>
                        <ListItemText primary={'salir'} />
                    </ListItem>
                </List>
            </Container>
        </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
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
});

export default Header;