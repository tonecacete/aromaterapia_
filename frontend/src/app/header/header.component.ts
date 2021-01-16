import { LoginService } from './../login/services/login.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck{
  username:string;
  //password:string;

  constructor(private loginServive:LoginService) { }

  ngOnInit() {
    //this.username = this.loginServive.getUsername();
    console.log(this.username + " header")
  }

  ngAfterViewInit(){
    this.username = this.loginServive.getUsername();
    console.log(this.username + " header")
  }

  ngDoCheck(){
    if (!this.username) {
      this.username = this.loginServive.getUsername();
    }
  }

}
