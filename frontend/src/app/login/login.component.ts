import { LoginService } from './services/login.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('openModal') openModal:ElementRef;
  username:string;
  password:string;

  constructor(private loginServive:LoginService) { }


  ngOnInit(){
    console.log(this.username);
  }

  ngAfterViewInit(){
    this.openModal.nativeElement.click();
  }

  login(){
    console.log(this.username);
    this.loginServive.setUsername(this.username);
    //this.loginServive.setPassword(this.password);
    this.openModal.nativeElement.click();
  }

}
