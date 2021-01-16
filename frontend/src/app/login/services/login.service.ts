import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private username:string;
  private password:string;

  constructor(
    // private router:Router
  ) { }

  setUsername(username){
    this.username=username;
  }

  getUsername(){
    let temp = this.username;
    //this.clearData();
    return temp;
  }

  setPassword(password){
    this.password=password;
  }

  getPassword(){
    let temp = this.password;
    //this.clearData();
    return temp;
  }

  clearData(){
    this.username = undefined;
    this.password = undefined;
  }
}
