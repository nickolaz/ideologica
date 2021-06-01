import React from 'react';
import Header from '../../components/header';
import { Button } from '@material-ui/core';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { error, labelerror } from '../../actions/Home.actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function ReportesPage (props:any) {
    const dispatch = useDispatch();
    const err = useSelector((state : RootState) => state.home.error);
    const labelErr = useSelector((state : RootState) => state.home.labelError);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return; }
        dispatch(error(false));
        dispatch(labelerror(""));
    };

    return (
        <div>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'4rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto'}}>Reportes</b></h2>
            <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    {labelErr}
                </MuiAlert>
            </Snackbar>
            <div style={{marginTop:'1%' , flexDirection : 'column' , display : 'flex' , alignItems : 'center'}}>
                <Button variant="contained" color="primary" style={{ marginTop:'1vh',marginBottom:'1vh'}} onClick={()=>{ props.history.replace("/reportes/cant")}}> 
                    Cantidad de ONG por Ideologia 
                </Button>
                <Button variant="contained" color="primary" style={{ marginTop:'1vh',marginBottom:'1vh'}} onClick={()=> props.history.replace("/reportes/dir") }>
                    Nombres de Directores de ONG
                </Button>
                <Button variant="contained" color="primary" style={{ marginTop:'1vh',marginBottom:'1vh'}} onClick={()=> props.history.replace("/reportes/vin") }> 
                    Reporte de vinculacion entre ONG 
                </Button>
            </div>
        </div>
    );
};
