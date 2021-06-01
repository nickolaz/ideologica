import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppConfig } from '../config/config';
import { HomeActionsEnum } from "../reducers/home";
import { API , getAuthHeaders } from "../api";
import { RootState } from "../store/store";

export const clearSemaforos = () => {
    return (dispatch: Dispatch ) => {
        dispatch({
            type: HomeActionsEnum.getSemaforos,
            payload: []
        })
    }
};

export const getSemaforos = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`semaforo/`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                const rows = resp.data.semaforos.length > 0? resp.data.semaforos.map((value : any,index : any)=>{ return { id: index + 1 , ...value }}) : []; 
                dispatch({
                    type: HomeActionsEnum.getSemaforos,
                    payload: rows
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getSemaforos,
                    payload: err.response?.data.semaforos || []
                });
            }
        );
    }
};

export const getInvestigacion = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`semaforo/investigacion`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                const rows = resp.data.investigacion.length > 0? resp.data.investigacion : []; 
                dispatch({
                    type: HomeActionsEnum.getInvestigacion,
                    payload: rows
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getInvestigacion,
                    payload: err.response?.data.investigacion || []
                });
            }
        );
    }
};

export const deleteSemaforos = (semaforo : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`semaforo/delete`,{ong : semaforo.ong},{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getSemaforos,
                    payload: []
                })
                dispatch({
                    type: HomeActionsEnum.getInvestigacion,
                    payload: []
                })
                getSemaforos();
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

export const createSemaforo = (semaforo : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`semaforo/new`,semaforo,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getSemaforos,
                    payload: []
                })
                dispatch({
                    type: HomeActionsEnum.getInvestigacion,
                    payload: []
                })
                getSemaforos();
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
                    payload: "Error al crear el Semaforo"
                });
            }
        );
    }
};

export const editSemaforo = (semaforo : any) => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.post(AppConfig.apiBaseUrl+`semaforo/edit`,semaforo,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getSemaforos,
                    payload: []
                })
                dispatch({
                    type: HomeActionsEnum.getInvestigacion,
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
                    payload: "Error al editar el Semaforo"
                });
            }
        );
    }
};
