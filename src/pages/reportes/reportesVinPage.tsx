import React, { useEffect } from 'react';
import Header from '../../components/header';
import { Button, makeStyles } from '@material-ui/core';
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
import { getVin } from '../../actions/Reportes.actions';

export default function ReportesVinPage (props:any) {
    const dispatch = useDispatch();
    const err = useSelector((state : RootState) => state.home.error);
    const labelErr = useSelector((state : RootState) => state.home.labelError);
    const classes = useStyles();
    const vin = useSelector((state : RootState) => state.home.vin);

    useEffect(() => {
        dispatch(getVin());
    },[vin.length]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return; }
        dispatch(error(false));
        dispatch(labelerror(""));
    };      

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h1 style={{marginTop:'2vh',marginBottom:'2vh',display:'flex'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>vinculación entre ONGs</b>
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
                            <TableCell>ONG</TableCell>
                            <TableCell align="right">ONG vinculada</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {vin.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.ong}
                            </TableCell>
                            <TableCell align="right">{row.relacion}</TableCell>
                        </TableRow>
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

const useStyles = makeStyles({
  table: {
    marginLeft:'auto',
    marginRight: 'auto',
    width:'100%',
    boxShadow: 'none'
  },
});
