import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppConfig } from '../config/config';
import { HomeActionsEnum } from "../reducers/home";
import { API , getAuthHeaders } from "../api";
import { RootState } from "../store/store";

export const clearOngs = () => {
    return (dispatch: Dispatch ) => {
        dispatch({
            type: HomeActionsEnum.getOngs,
            payload: []
        })
    }
};

export const getOngs = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`ong/`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                const rows = resp.data.ongs.length > 0? resp.data.ongs.map((value : any,index : any)=>{ return { id: index + 1 , ...value }}) : []; 
                dispatch({
                    type: HomeActionsEnum.getOngs,
                    payload: rows
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getOngs,
                    payload: err.response?.data.ongs || []
                });
            }
        );
    }
};

export const createOngs = (ong : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`ong/new`,ong,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                getOngs();
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
                    payload: "Error al crear la Ong"
                });
            }
        );
    }
};

export const deleteOngs = (ong : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`ong/delete`,{ong : ong.ong},{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getOngs,
                    payload: []
                })
                getOngs();
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
                    payload: "Error al eliminar la Ong"
                });
            }
        );
    }
};

export const editOngs = (ong : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`ong/edit`,ong,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getOngs,
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
                    payload: "Error al editar la Ong"
                });
            }
        );
    }
};