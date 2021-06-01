import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppConfig } from '../config/config';
import { HomeActionsEnum } from "../reducers/home";
import { API , getAuthHeaders } from "../api";
import { RootState } from "../store/store";

export const getCant = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`reportes/cant`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getCant,
                    payload: resp.data.reporte
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getCant,
                    payload: err.response?.data.reporte || []
                });
            }
        );
    }
};

export const getDir = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`reportes/dir`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getDir,
                    payload: resp.data.reporte
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getDir,
                    payload: err.response?.data.reporte || []
                });
            }
        );
    }
};

export const getVin = () => {
    return (dispatch: Dispatch, getState : () => RootState) => {
        const {home} = getState();
        API.get(AppConfig.apiBaseUrl+`reportes/vin`,{ headers: getAuthHeaders(home.token)})
        .then(
            (resp: AxiosResponse<any>) => {
                dispatch({
                    type: HomeActionsEnum.getVin,
                    payload: resp.data.reporte
                });            
            }
        )
        .catch(
            (err: AxiosError) => {
                dispatch({
                    type: HomeActionsEnum.getVin,
                    payload: err.response?.data.reporte || []
                });
            }
        );
    }
};