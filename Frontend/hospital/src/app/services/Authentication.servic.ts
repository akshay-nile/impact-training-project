import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    storeUserId(id:any){
        sessionStorage.setItem("userId",id);
    }

    getUserId():any{
        return sessionStorage.getItem("userId");
    }

    storeUserName(userName:string){
        sessionStorage.setItem("userName",userName);
    }

    getUserName():any{
        return sessionStorage.getItem("userName");
    }

    clearSession(){
        sessionStorage.clear();
    }
    
}