import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  title = 'Login and Reg Demo';
  loadLogin: boolean;
  loadRegister: boolean;
  loginUser: any

  constructor(private _httpService: HttpService){

  }
  ngOnInit(){
    this.user = {
      loggedin: false,
      f_name:'N/A',
      l_name:'N/A',
      email:'N/A'
    }
    this.loginUser = {}
    this.loadLogin = false;
    this.loadRegister = false;
  }

  toggleLogin(){
    this.loadRegister = false;
    this.loadLogin = !this.loadLogin
  }
  toggleRegister(){
    this.loadLogin = false;
    this.loadRegister = !this.loadRegister

  }

  trylogin($event){
    this.loginUser = $event
    console.log('login attemp', this.loginUser)
    var Observable=this._httpService.login(this.loginUser)
    Observable.subscribe(message =>{
      console.log('login message is ', message)
      if(message.body['message'] == 'success'){
        this.user.loggedin = true;
        this.user.f_name = message.body['user'].first_name
        this.user.l_name = message.body['user'].last_name
        this.user.email = message.body['user'].email
        console.log('user is now',this.user)
      }else{
        this.user.loggedin = false;
      }
    })
  }

}
