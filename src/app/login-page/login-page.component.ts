import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { NgForm } from '@angular/forms';
import { MainscreenService } from  '../main-screen/mainscreen.service';
import {  NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { login } from './login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isRegSpinning = false;
  isLogSpinning = false;
  login = 1;
  register = 0;
  registerModel = new User();
  loginModel = new login();


  constructor( private service: MainscreenService , private route :Router, private message: NzMessageService) { }

  ngOnInit() {

    localStorage.clear();
    sessionStorage.clear();


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
    this.isRegSpinning = true;

    console.log(this.registerModel);
    this.registerModel.userType = 'USER';
    this.registerModel.password = '123';
    this.registerModel.active = true;
    this.registerModel.clientId = 1;

    this.service.registerUser(this.registerModel)
    .subscribe(
        data => {
          if(data.result.status == 200){
            console.log(data.result);
            this.message.success(data.result.message, { nzDuration: 3000 });
            this.isRegSpinning = false;

          }
          else{
            console.log(data.result);
            this.message.error(data.result.message, { nzDuration: 3000 });
            this.isRegSpinning = false;
          }
        }

    )

  }

  loginSubmit(loginForm : NgForm){
    this.isLogSpinning = true;
    console.log(this.loginModel);
    // this.loginModel.password = '123';
    // this.loginModel.Role = 'USER';
    this.service.loginUser(this.loginModel)
    .subscribe(
        res => {
          if(res){
            if(res.status == 200){
              console.log(res);
              sessionStorage.setItem('token',res.result.token);
              sessionStorage.setItem('username',res.result.username);
              sessionStorage.setItem('role',res.result.userType);

              if(res.result.userType==="USER")
              this.route.navigate(['categories/products']);

              else if(res.result.userType==="ADMIN")
              this.route.navigate(['admin/layout'])
              this.isLogSpinning = false;
              this.message.success('Login Successful',{ nzDuration: 3000 });




            }

          }

        },
        error =>{
          if(error){
            this.message.error('Invalid Company ID',{ nzDuration: 3000 })
            this.isLogSpinning = false;

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
