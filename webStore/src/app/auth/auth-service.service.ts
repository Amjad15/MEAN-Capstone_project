import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  gettoken(){  
    return localStorage.getItem("SeesionUser");  
    } 
  settoken( email : any){  
     localStorage.setItem("SeesionUser",email); 
      }  
  setUserInfo( obj : any){  
        localStorage.setItem("User",JSON.stringify(obj)); 
         }
  getUserInfo( obj : any){  
          localStorage.getItem("User"); 
        }  
}
