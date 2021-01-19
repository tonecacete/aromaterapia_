import { LoginService } from './services/login.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../body/receitas/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('openModal') openModal:ElementRef;
  users;
  @Input() username:string;
  @Input() password:string;

  constructor(
    private loginServive:LoginService,
    private backendService: BackendService
  ) { }


  ngOnInit(){
    //this.users = this.backendService.getUsers();
    this.backendService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    })

  }

  ngAfterViewInit(){
    this.openModal.nativeElement.click();
  }

  login(){
    console.log(this.username);
    let login_success = false;
    this.loginServive.setUsername(this.username);
    //this.loginServive.setPassword(this.password);

    if (this.users) {
      for(let u of this.users){
        if (u['username'] === this.username && u['password'] === this.username) {
          login_success = true;
          alert("login success");
        }
      }
    }

    console.log(this.username);
    this.openModal.nativeElement.click();
  }

}
