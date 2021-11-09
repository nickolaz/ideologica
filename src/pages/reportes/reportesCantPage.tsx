import React, { useEffect } from 'react';
import Header from '../../components/header';
import { Box, Button, Collapse, IconButton, makeStyles, Typography } from '@material-ui/core';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { error, labelerror } from '../../actions/Home.actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getCant } from '../../actions/Reportes.actions';
import { getSemaforos } from '../../actions/semaforo.actions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ReportesCantPage (props:any) {
    const dispatch = useDispatch();
    const err = useSelector((state : RootState) => state.home.error);
    const labelErr = useSelector((state : RootState) => state.home.labelError);
    const classes = useStyles();
    const cant = useSelector((state : RootState) => state.home.cant);
    const semaforos = useSelector((state : RootState) => state.home.semaforos);

    useEffect(() => {
        dispatch(getCant());
        dispatch(getSemaforos());
    },[cant.length]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return; }
        dispatch(error(false));
        dispatch(labelerror(""));
    };      

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h1 style={{marginTop:'2vh',marginBottom:'2vh',display:'flex'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Cantidad de ONG por Ideologia</b>
            </h1>
            <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    {labelErr}
                </MuiAlert>
            </Snackbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Ideologia</TableCell>
                            <TableCell align="right">Cantidad de ONG</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { cant.map((row,index) => (
                        <Row key={index} row={row} semaforos={semaforos} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{marginTop:'1%' , flexDirection : 'column' , display : 'flex' , alignItems : 'center'}}>
                <Button variant="contained" color="secondary" style={{ marginTop:'1vh',marginBottom:'1vh'}} onClick={()=> props.history.replace("/reportes") }> 
                    Cerrar
                </Button>
            </div>
        </div>
    );
};

const Row = ( props : any) => {
    const { row , key , semaforos} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow key={key} >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.ideologia}
                </TableCell>
                <TableCell align="right">{row.cant}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box style={{margin: '1%'}}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ONG</TableCell>
                                        <TableCell align="right">Fuente</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        semaforos.filter((semaforo : any) => semaforo.ideologia === row.ideologia).map((semaforo : any,index : any) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {semaforo.ong}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <a href={semaforo.fuente.toString()} target="_blank" rel="noreferrer" >
                                                        {semaforo.fuente.toString()}
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const useStyles = makeStyles({
  table: {
    marginLeft:'auto',
    marginRight: 'auto',
    width:'100%',
    boxShadow: 'none'
  },
});
