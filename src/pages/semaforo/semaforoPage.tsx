import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Button, Snackbar,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { error, labelerror } from '../../actions/Home.actions';
import { DataGrid } from '@material-ui/data-grid';
import { deleteSemaforos, getInvestigacion, getSemaforos } from '../../actions/semaforo.actions';
import SearchBar from "material-ui-search-bar";

export default function SemaforoPage (props:any) {
    const err = useSelector((state : RootState) => state.home.error);
    const dispatch = useDispatch();
    const labelErr = useSelector((state : RootState) => state.home.labelError);
    const tipoLogeado = useSelector((state : RootState) => state.home.type);
    const [row,setrow] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const semaforos = useSelector((state : RootState) => state.home.semaforos);
    const [searched, setSearched] = useState<string>("");
    const [rowSemaforo,setRowSemaforo] = useState<any>();

    useEffect(() => {
        dispatch(getSemaforos());
        dispatch(getInvestigacion());
        if(semaforos) setRowSemaforo(semaforos);
    },[semaforos.length]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return; }
        dispatch(error(false));
        dispatch(labelerror(""));
    };

    const columns: any[] = [
        { field: 'id', headerName: 'id', width: 90 },
        { field: 'ong', headerName: 'ONG', width: 200 },
        // { field: 'ideologia', headerName: 'Ideologia', width: 200 },
        // { field: 'publicaciones', headerName: 'Publicaciones', width: 250  },
        { field: 'relacion', headerName: 'Relacion con otra ONG', width: 280 },
        // { field: 'investigacion', headerName: 'Investigacion', width: 450 },
    ];

    const handleCancel = () => {
        setOpen(false);
    };

    const handleAceptar = () => {
        dispatch(deleteSemaforos(row?.data));
        setOpen(false);
        setrow(null);
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = semaforos.filter((row) => {
            let search = row?.ong?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.relacion?.toLowerCase().includes(searchedVal.toLowerCase());
            return search;
        });
        setRowSemaforo(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto'}}>Redes</b>
            </h2>
            <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    {labelErr}
                </MuiAlert>
            </Snackbar>
            <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <div style={{ height: 400, width: '100%' , marginTop: '1vh',display: 'flex',marginRight: 'auto',marginLeft: 'auto'}}>
                <DataGrid rows={rowSemaforo?rowSemaforo:semaforos} columns={columns} pageSize={5} onRowSelected={(e)=>{ setrow(e); }} />
            </div>
            { tipoLogeado === 'A' &&
                <div style={{marginTop:'1%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={()=>{ props.history.replace("/semaforo/new")}}> Crear </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: 'green'}} disabled={row==null} onClick={()=>{
                        props.history.replace("/semaforo/edit",row?.data);
                    }}> Editar </Button>
                    <Button variant="contained" color="primary" style={{marginLeft:'1%',marginRight:'1%'}} disabled={row==null} onClick={()=>{
                        props.history.replace("/semaforo/view",row?.data);
                    }}> Ver </Button>
                    {/* <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} disabled={row==null} onClick={()=> setOpen(true)}> Eliminar </Button> */}
                </div>
            }
            { tipoLogeado === 'O' &&
                <div style={{marginTop:'1%'}}>
                    <Button variant="contained" color="primary" style={{marginLeft:'1%',marginRight:'1%'}} disabled={row==null} onClick={()=>{
                        props.history.replace("/semaforo/view",row?.data);
                    }}> Ver </Button>
                </div>
            }
            <Dialog open={open} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{"Eliminar Semaforo"}</DialogTitle>   
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Seguro que desea eliminar el semaforo de {row?.data.ong} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary" > Cancelar </Button>
                    <Button onClick={handleAceptar} color="primary" autoFocus> Aceptar </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
