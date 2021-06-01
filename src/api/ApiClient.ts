import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConfig } from '../config/config';

axios.create({
    timeout: AppConfig.apiTimeout,
    headers: { 
        'Content-Type': 'application/json'
    },
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {    
    // console.log("REQUEST: ",config);
    return config;
});

axios.interceptors.response.use((response: AxiosResponse<any>) => {
    return response;
});

export default axios;

export const getPublicHeaders = () => {
    return {
        'Content-Type': 'application/json'
    }
};

export const getAuthHeaders = (token : string | null) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    // return {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer '+token
    // }
};