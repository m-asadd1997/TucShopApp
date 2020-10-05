import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class LoginPageComponent implements OnInit,AfterViewInit {

  isRegSpinning = false;
  isLogSpinning = false;
  login = 1;
  register = 0;
  registerModel = new User();
  loginModel = new login();


  constructor( private service: MainscreenService , private route :Router, private message: NzMessageService) { }
  ngAfterViewInit(): void {
   //this.fullScreen();
  }

  ngOnInit() {
   //this.fullScreen();
    localStorage.clear();
    sessionStorage.clear();


  }

//   fullScreen() {
//     let elem = document.documentElement;
//     let methodToBeInvoked = elem.requestFullscreen ||
//       elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
//       ||
//       elem['msRequestFullscreen'];
//     if (methodToBeInvoked) methodToBeInvoked.call(elem);
// }


  gotoLogin() {
    this.register = 0;
    this.login = 1;
  }

  gotoRegister() {
    this.login = 0;
    this.register = 1
  }

  submit(){
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

  loginSubmit(){
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
              if(res.result == null){

              this.message.error('Your 1 Month Trial Version Has Expired. Contact Shahzad: 03322078369',{ nzDuration: 10000 });
              this.isLogSpinning = false;
              }
              else {
              sessionStorage.setItem('token',res.result.token);
              sessionStorage.setItem('username',res.result.username);
              sessionStorage.setItem('role',res.result.userType);
              sessionStorage.setItem('key',res.result.accountAccessKey);


              if(res.result.userType==="USER")
              this.route.navigate(['categories/products']);

              else if(res.result.userType==="ADMIN")
              this.route.navigate(['admin/layout'])
              this.isLogSpinning = false;
              this.message.success('Login Successful',{ nzDuration: 3000 });




            }
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
