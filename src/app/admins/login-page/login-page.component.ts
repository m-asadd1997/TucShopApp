import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from './login';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { MainscreenService } from  '../../main-screen/mainscreen.service';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isRegSpinning = false;
  isLogSpinning = false;
  loginModel = new login();



  


  constructor(private route: Router,private message: NzMessageService,private service: MainscreenService ) { }
  
  
  
  
  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
  }


  logValidate(){
    if(this.loginModel.username && this.loginModel.password){
      return false;
    }
    else{
      return true;
    }

  }


  loginSubmit(loginForm : NgForm){
    this.isLogSpinning = true;
    console.log(this.loginModel);
    this.loginModel.Role = 'ADMIN';
    this.service.loginUser(this.loginModel)
    .subscribe(
        res => {
          if(res){
            if(res.status == 200){
              console.log(res);
              sessionStorage.setItem('token',res.result.token);
              sessionStorage.setItem('username',res.result.username);
              sessionStorage.setItem('role',res.result.userType);
              this.route.navigate(['admin/layout']);
              this.isLogSpinning = false;
              this.message.success('Login Successful',{ nzDuration: 3000 });
              
            }
            
          }
          
        },
        error =>{
          if(error){
            this.message.error('Invalid Company ID',{ nzDuration: 3000 })
            this.route.navigate(['admin']);
            this.isLogSpinning = false;

          }
        }

      )
      
     }
  

  

}
