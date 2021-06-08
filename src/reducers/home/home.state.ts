interface AuthStateModel {
    token: string | null;
    error: boolean;
    labelError: string;
    ongs : any[];
    semaforos : any[];
    investigaciones : any[];
    cant : any[],
    dir : any[],
    vin : any[],
    type : any,
    users : any[],
    userLogeado : string,
}

export default AuthStateModel;