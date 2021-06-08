import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppConfig } from '../config/config';
import { HomeActionsEnum } from "../reducers/home";
import { API , getAuthHeaders } from "../api";
import { RootState } from "../store/store";

export const clearUser = () => {
    return (dispatch: Dispatch ) => {
        dispatch({
            type: HomeActionsEnum.getUsers,
            payload: []
        })
    }
};

export const getUsers = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`usuario/`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                const rows = resp.data.users.length > 0? resp.data.users.map((value : any,index : any) => { 
                    return { id: index + 1 , ...value ,tipo: value.tipo==='A'?'Administrador':'Operador'}
                }) : []; 
                dispatch({
                    type: HomeActionsEnum.getUsers,
                    payload: rows
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getUsers,
                    payload: err.response?.data.users || []
                });
            }
        );
    }
};

export const createUser = (user : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`usuario/new`,user,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getUsers,
                    payload: []
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.error,
                    payload: true
                });
                dispatch({
                    type: HomeActionsEnum.labelerror,
                    payload: "Error al crear el user"
                });
            }
        );
    }
};

export const deleteUser = (user : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`usuario/delete`,{username : user.username},{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getUsers,
                    payload: []
                })
                getUsers();
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.error,
                    payload: true
                });
                dispatch({
                    type: HomeActionsEnum.labelerror,
                    payload: "Error al eliminar el Usuario"
                });
            }
        );
    }
};

export const editUser = (user : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`usuario/edit`,user,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getUsers,
                    payload: []
                })
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.error,
                    payload: true
                });
                dispatch({
                    type: HomeActionsEnum.labelerror,
                    payload: "Error al editar el Usuario"
                });
            }
        );
    }
};

export const editPassUser = (user : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`usuario/changepass`,user,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getUsers,
                    payload: []
                })
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.error,
                    payload: true
                });
                dispatch({
                    type: HomeActionsEnum.labelerror,
                    payload: "Error al editar el Usuario"
                });
            }
        );
    }
};