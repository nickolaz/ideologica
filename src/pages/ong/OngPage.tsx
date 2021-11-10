import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { error, labelerror } from '../../actions/Home.actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { deleteOngs, getOngs } from '../../actions/Ong.actions';
import SearchBar from "material-ui-search-bar";
import { deleteSemaforos, getInvestigacion } from '../../actions/semaforo.actions';

export default function OngPage (props:any) {
    const dispatch = useDispatch();
    const [row,setrow] = useState<any>(null);
    const ongs = useSelector((state : RootState) => state.home.ongs);
    const err = useSelector((state : RootState) => state.home.error);
    const tipoLogeado = useSelector((state : RootState) => state.home.type);
    const labelErr = useSelector((state : RootState) => state.home.labelError);
    const home = useSelector((state : RootState) => state.home.home);
    const [open, setOpen] = useState(false);
    const [searched, setSearched] = useState<string>("");
    const [rowOng,setRowOng] = useState<any>();

    useEffect(() => {
        dispatch(getOngs());
        dispatch(getInvestigacion());
        setRowOng(home);
    },[ongs.length]);

    const columns: any[] = [
        { field: 'ong', headerName: 'Nombre', width: 250 },
        { field: 'direccion', headerName: 'Direccion', width: 380 },
        { field: 'telefono', headerName: 'Telefono', width: 150  },
        { field: 'mail', headerName: 'Mail', width: 300 },
        { field: 'director', headerName: 'Director', width: 220 },
        { field: 'ideologia', headerName: 'Ideologia', width: 250 },
        { field: 'publicaciones', headerName: 'Publicaciones', width: 280  },
        { field: 'instagram', headerName: 'Instagram', width: 250 },
        { field: 'twitter', headerName: 'Twitter', width: 250 },
        { field: 'fb', headerName: 'Facebook', width: 250 },
        { field: 'web', headerName: 'Sitio Web', width: 250 },
        { field: 'investigacion', headerName: 'Investigacion', width: 450 },
        { field: 'fecha_creacion', headerName: 'Fecha de Creacion', width: 200 },
    ];

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return; }
        dispatch(error(false));
        dispatch(labelerror(""));
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleAceptar = () => {
        dispatch(deleteOngs(row?.data));
        dispatch(deleteSemaforos(row?.data));
        setOpen(false);
        setrow(null);
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = ongs.filter((row) => {
            let search = row?.ong?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.direccion?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.telefono?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.mail?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.director?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.insta?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.twitter?.toLowerCase().includes(searchedVal.toLowerCase()) ||  row?.web?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.fb?.toLowerCase().includes(searchedVal.toLowerCase());
            return search;
        });
        setRowOng(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>ONGs</b>
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
            <div style={{ height: 400, width: '100%' , marginTop: '1vh'}}>
                <DataGrid rows={rowOng?rowOng:ongs} columns={columns} pageSize={5} onRowSelected={(e)=>{ setrow(e); }} />
            </div>
            { tipoLogeado === 'A' &&
                <div style={{marginTop:'1%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={()=>{ props.history.replace("/ong/new")}}> Crear </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: 'green'}} disabled={row==null} onClick={()=>{
                        props.history.replace("/ong/edit",row?.data);
                    }}> Editar </Button>
                    <Button variant="contained" color="primary" disabled={row==null} style={{ marginLeft:'1%',marginRight:'1%'}} onClick={()=>{
                        props.history.replace("/ong/view",row?.data);
                    }}> Ver </Button>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} disabled={row==null} onClick={()=> setOpen(true)}> Eliminar </Button>
                </div>
            }
            { tipoLogeado === 'O' &&
                <div style={{marginTop:'1%'}}>
                    <Button variant="contained" color="primary" disabled={row==null} style={{ marginLeft:'1%',marginRight:'1%'}} onClick={()=>{
                        props.history.replace("/ong/view",row?.data);
                    }}> Ver </Button>
                </div>
            }
            <Dialog open={open} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{"Eliminar ONG"}</DialogTitle>   
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Seguro que desea eliminar la ONG {row?.data.ong} ?
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
