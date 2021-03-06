class Auth {
  authenticated : boolean = false;

    constructor() {
      this.authenticated = false;
    }
  
    login(cb : any) {
      this.authenticated = true;
      cb();
    }
  
    logout(cb : any) {
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
export default new Auth();
  