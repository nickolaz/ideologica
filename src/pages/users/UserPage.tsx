import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { error, labelerror } from '../../actions/Home.actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { deleteUser, getUsers } from '../../actions/User.actions';
import SearchBar from "material-ui-search-bar";

export default function UserPage (props:any) {
    const dispatch = useDispatch();
    const [row,setrow] = useState<any>(null);
    const users = useSelector((state : RootState) => state.home.users);
    const tipoLogeado = useSelector((state : RootState) => state.home.type);
    const userLogeado = useSelector((state : RootState) => state.home.userLogeado);
    const err = useSelector((state : RootState) => state.home.error);
    const labelErr = useSelector((state : RootState) => state.home.labelError);
    const [open, setOpen] = useState(false);
    const [searched, setSearched] = useState<string>("");
    const [rowUser,setRowUser] = useState<any>();

    useEffect(() => {
        dispatch(getUsers());
        if(users) setRowUser(users);
    },[users.length]);

    const columns: any[] = [
        { field: 'id', headerName: 'id', width: 90 },
        { field: 'username', headerName: 'Nombre de Usuario', width: 250 },
        { field: 'nombre', headerName: 'Nombre', width: 300 },
        { field: 'tipo', headerName: 'Tipo de Usuario', width: 250 },
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
        if(row?.data.username !== 'admin'){
            dispatch(deleteUser(row?.data));
        }
        setOpen(false);
        setrow(null);
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = users.filter((row) => {
            let search = row?.username?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.nombre?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.tipo?.toLowerCase().includes(searchedVal.toLowerCase());
            return search;
        });
        setRowUser(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div style={{width: '100%'}}>
            <Header history={props.history}/>
            <h2 style={{display:'flex',fontSize:'3rem',marginBottom:'auto'}}>
                <b style={{marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>Usuarios</b>
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
                <DataGrid rows={users} columns={columns} pageSize={5} onRowSelected={(e)=>{ setrow(e); }} />
            </div>
            { tipoLogeado === 'A' &&
                <div style={{marginTop:'1%'}}>
                    <Button variant="contained" color="primary" style={{ marginLeft:'1%',marginRight:'1%'}} onClick={()=>{ props.history.replace("/users/new")}}> Crear </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: 'green'}} disabled={row==null} onClick={()=>{
                        props.history.replace("/users/edit",row?.data);
                    }}> Editar </Button>
                    <Button variant="contained" color="primary" disabled={row==null} style={{ marginLeft:'1%',marginRight:'1%'}} onClick={()=>{
                        props.history.replace("/users/view",row?.data);
                    }}> Ver </Button>
                    <Button variant="contained" color="primary" style={{backgroundColor: 'green'}} disabled={row==null} onClick={()=>{
                        props.history.replace("/users/changepass",row?.data);
                    }}> Cambiar contrase??a </Button>
                    <Button variant="contained" color="secondary" style={{ float: 'right' , marginRight: '1%'}} disabled={row==null} onClick={()=> setOpen(true)}> Eliminar </Button>
                </div>
            }
            { tipoLogeado === 'O' &&
                <div style={{marginTop:'1%'}}>
                    <Button variant="contained" color="primary" style={{backgroundColor: 'green'}} disabled={!(row && row?.data.username == userLogeado)} onClick={()=>{
                        props.history.replace("/users/changepass",row?.data.username);
                    }}> Cambiar contrase??a </Button>
                </div>
            }
            <Dialog open={open} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">{"Eliminar Usuario"}</DialogTitle>   
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Seguro que desea eliminar el usuario {row?.data.username} ?
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
