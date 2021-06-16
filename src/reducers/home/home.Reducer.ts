import HomeStateModel from './home.state';
import { HomeActionsEnum }   from './index';

type homeState = HomeStateModel;

type homeAction = {
    type: HomeActionsEnum,
    payload: homeState | string | null | boolean | any[]
}

const initialState : HomeStateModel = {
    token : null,
    error : false,
    labelError : '',
    ongs : [],
    semaforos : [],
    investigaciones : [],
    cant : [],
    dir : [],
    vin : [],
    type : '',
    users : [],
    userLogeado : '',
    home : [],
}

const authReducer = (state: homeState = initialState, action: homeAction) => {
    switch (action.type) {
        case HomeActionsEnum.login:
            return {
                ...state,
                token: action.payload
            } as homeState;
        case HomeActionsEnum.logout:
            return {
                ...state,
                token: null
            } as homeState;
        case HomeActionsEnum.error:
            return {
                ...state,
                error: action.payload
            } as homeState;
        case HomeActionsEnum.labelerror:
            return {
                ...state,
                labelError: action.payload
            } as homeState;
        case HomeActionsEnum.getOngs:
            return {
                ...state,
                ongs: action.payload
            } as homeState;
        case HomeActionsEnum.getSemaforos:
            return {
                ...state,
                semaforos: action.payload
            } as homeState;
        case HomeActionsEnum.getInvestigacion:
            return {
                ...state,
                investigaciones: action.payload
            } as homeState;
        case HomeActionsEnum.getCant:
            return {
                ...state,
                cant: action.payload
            } as homeState;
        case HomeActionsEnum.getDir:
            return {
                ...state,
                dir: action.payload
            } as homeState;
        case HomeActionsEnum.getVin:
            return {
                ...state,
                vin: action.payload
            } as homeState;
        case HomeActionsEnum.getType:
            return {
                ...state,
                type: action.payload
            } as homeState;
        case HomeActionsEnum.getUsers:
            return {
                ...state,
                users: action.payload
            } as homeState;
        case HomeActionsEnum.getUserLogeado:
            return {
                ...state,
                userLogeado: action.payload
            } as homeState;
        case HomeActionsEnum.getHome:
            return {
                ...state,
                home: action.payload
            } as homeState;
        default:
            return state;
    }
}

export default authReducer;