import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppConfig } from '../config/config';
import { HomeActionsEnum } from "../reducers/home";
import { API, getPublicHeaders } from "../api";

export const login = (loginDto: any,history:any) => {
    return (dispatch: Dispatch) => {
        API.post(AppConfig.apiBaseUrl+`auth/login`, loginDto, { headers: getPublicHeaders() })
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.login,
                    payload: resp.headers.authorization
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
