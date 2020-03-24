import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { NgForm } from '@angular/forms';
import { MainscreenService } from  '../main-screen/mainscreen.service';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { login } from './login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  login = 1;
  register = 0;
  registerModel = new User();
  loginModel = new login();


  constructor( private service: MainscreenService , private route :Router, private message: NzMessageService) { }

  ngOnInit() {
    
  }

  gotoLogin() {
    this.register = 0;

    this.login = 1;
  }

  gotoRegister() {
    this.login = 0;

    this.register = 1
  }

  submit(registerForm : NgForm){
    console.log(this.registerModel);
    this.registerModel.userType = 'USER';
    this.registerModel.password = '123';
    this.registerModel.active = true;
    this.registerModel.clientId = 1;

    this.service.registerUser(this.registerModel)
    .subscribe(
        data => {
          if(data.status == 200){
            this.message.success("Registered Successfully", { nzDuration: 3000 });

          }
          else{
            this.message.error("Could Not Register", { nzDuration: 3000 });

          }
        }
        
    )

  }

  loginSubmit(loginForm : NgForm){
    console.log(this.loginModel);
    this.loginModel.password = '123';

    this.service.loginUser(this.loginModel)
    .subscribe(
        res => {
          if(res){
            if(res.status == 200){
              console.log(res);
              localStorage.setItem('token',res.result.token);
              this.message.success('Login Successful',{ nzDuration: 3000 });
              this.route.navigate(['main']);

            }
            
          }
          
        },
        error =>{
          if(error){
            this.message.error('Invalid Company ID',{ nzDuration: 3000 })
          }
        }       
      )

     

      
     }
     
     validate(){
        if(this.registerModel.name && this.registerModel.email){
          return false;
        }
        else{
          return true
        }
    }

    logValidate(){
      if(this.loginModel.username){
        return false;
      }
      else{
        return true
      }
  }

    

}
