import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: any
  @Output() trylogin = new EventEmitter<any>();

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.loginUser = {
      email:'',
      password:''
  }
  }

  sendLogin(){
    this.trylogin.emit(this.loginUser)
  }
}
