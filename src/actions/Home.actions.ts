import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppConfig } from '../config/config';
import { HomeActionsEnum } from "../reducers/home";
import { API, getAuthHeaders, getPublicHeaders } from "../api";
import { RootState } from "../store/store";

export const login = (loginDto: any,history:any) => {
    return (dispatch: Dispatch) => {
        API.post(AppConfig.apiBaseUrl+`auth/login`, loginDto, { headers: getPublicHeaders() })
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.login,
                    payload: resp.headers.authorization
                });
                dispatch({
                    type: HomeActionsEnum.getType,
                    payload: resp.data.tipo
                });
                dispatch({
                    type: HomeActionsEnum.getUserLogeado,
                    payload: loginDto.user
                });           
                history.push("/home")
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
                    payload: err.response?.data.message
                });
            }
        );
    }
};

export const clearAuth = () => {
    return (dispatch: Dispatch ) => {
        dispatch({
            type: HomeActionsEnum.logout,
            payload: null
        })
    }
};

export const error = (er : any) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: HomeActionsEnum.error,
            payload: er
        });
    }
}

export const labelerror = (er : any) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: HomeActionsEnum.labelerror,
            payload: er
        });
    }
}

export const getHome = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`ong/home`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                const rows = resp.data.home.length > 0? resp.data.home.map((value : any,index : any)=>{ return { id: index + 1 , ...value }}) : []; 
                dispatch({
                    type: HomeActionsEnum.getHome,
                    payload: rows
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getHome,
                    payload: err.response?.data.ongs || []
                });
            }
        );
    }
};