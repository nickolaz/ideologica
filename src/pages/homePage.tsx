import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import semaforo from '../assets/semaforo.jpg';
import { makeStyles, Snackbar } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { error, getHome, labelerror } from '../actions/Home.actions';
import MuiAlert from '@material-ui/lab/Alert';

export default function HomePage (props:any) {
    const classes = useStyles();
    const err = useSelector((state : RootState) => state.home.error);
    const dispatch = useDispatch();
    const labelErr = useSelector((state : RootState) => state.home.labelError);
    const [searched, setSearched] = useState<string>("");
    const home = useSelector((state : RootState) => state.home.home);
    const [rowHome,setRowHome] = useState<any>();
    const [row,setrow] = useState<any>(null);
    
    useEffect(() => {
        dispatch(getHome());
        if(home) setRowHome(home);
    },[home.length]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') { return; }
        dispatch(error(false));
        dispatch(labelerror(""));
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = home.filter((row) => {
            let search = row?.ong?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.ideologia?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.publicaciones?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.relacion?.toLowerCase().includes(searchedVal.toLowerCase()) || 
                row?.investigacion?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.direccion?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.telefono?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.mail?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.director?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.insta?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.twitter?.toLowerCase().includes(searchedVal.toLowerCase()) || row?.contacto?.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row?.web?.toLowerCase().includes(searchedVal.toLowerCase());
            return search;
        });
        setRowHome(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const columns: any[] = [
        { field: 'id', headerName: 'id', width: 90 },
        { field: 'ong', headerName: 'ONG', width: 200 },
        { field: 'ideologia', headerName: 'Ideologia', width: 250 },
        { field: 'publicaciones', headerName: 'Publicaciones', width: 280  },
        { field: 'relacion', headerName: 'Relacion con otra ONG', width: 280 },
        { field: 'investigacion', headerName: 'Investigacion', width: 450 },
        { field: 'direccion', headerName: 'Direccion', width: 550 },
        { field: 'telefono', headerName: 'Telefono', width: 150  },
        { field: 'mail', headerName: 'Mail', width: 250 },
        { field: 'director', headerName: 'Director', width: 220 },
        { field: 'instagram', headerName: 'Instagram', width: 180 },
        { field: 'twitter', headerName: 'Twitter', width: 180 },
        { field: 'contacto', headerName: 'Contacto', width: 250 },
        { field: 'web', headerName: 'Sitio Web', width: 280 },
        { field: 'fecha_creacion', headerName: 'Fecha de Creacion', width: 200 },
    ];

    return (
        <div className={classes.image}>
            <Header history={props.history}/>
            <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    {labelErr}
                </MuiAlert>
            </Snackbar>
            <SearchBar
                style={{marginTop: '5vh'}}
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <div style={{ height: 400, width: '100%' , marginTop: '1vh',display: 'flex',marginRight: 'auto',marginLeft: 'auto'}}>
                <DataGrid rows={rowHome?rowHome:home} columns={columns} pageSize={5} onRowSelected={(e)=>{ setrow(e); }} />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    image: {
        // backgroundImage: `url(${semaforo})` ,
        height: '100vh' , 
        // backgroundRepeat: 'no-repeat' , 
        // backgroundPosition: 'center'
    }
}));