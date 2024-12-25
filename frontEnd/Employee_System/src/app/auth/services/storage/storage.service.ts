import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

const TOKEN ="token";
const USER="user"

@Injectable({
  providedIn: 'root'
})
export  class StorageService {

  constructor(@Inject(PLATFORM_ID) platformId: Object) {}

  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER , JSON.stringify(user));
  }

  static getToken():string| null{
    return localStorage.getItem(TOKEN);
  }

  static getUser():any{
    return  JSON.parse(<string>localStorage.getItem(USER))
  }

  
  static getUserRole():string{
    const user =this.getUser();
    if(user == null){
      return '';
    }else{
      return user.role;
    }
  }

static getUserName():string{
  const user =this.getUser();

  if(user == null){
    return '';
  }
  else{
    return user.empName;
  }
}

  static isAdminLogged():boolean{
    if(this.getToken() == null)
      return false;
    const role= this.getUserRole();
    return role == "ADMIN";  
  }

  
   static isEmployeeLogged():boolean{
    if(this.getToken() == null)
      return false ;
    const role = this.getUserRole();
    return role == "EMPLOYEE";
   }

   static getUserId():string{
    const user = this.getUser();
    if(user == null)
      return "";
    return user.id;
   }

   static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
   }


  


}
