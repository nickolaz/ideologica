enum HomeActionsEnum {
    login = '[Auth] Login',
    logout = '[Auth] Logout',
    error = '[Auth] error',
    labelerror = '[Auth] label error',
    getOngs = '[Ong] obtener ongs',
    getSemaforos = '[Semaforo] obtener semaforos',
    getInvestigacion = '[investigacion] obtener investigaciones',
    getCant = '[Reporte] obtener cant Ong por Ideologia',
    getDir = '[Reporte] obtener nombres de directores de Ong',
    getVin = '[Reporte] obtener vinculacion entre las Ong',
    getType = '[Auth] Tipo de Usuario',
    getUsers = '[Users] obtener usuarios',
    getUserLogeado = '[Auth] usuario logeador',
    getHome = '[Home] obtener ongs y semaforo para el home',
}

export default HomeActionsEnum;