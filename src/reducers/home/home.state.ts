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
}

export default AuthStateModel;