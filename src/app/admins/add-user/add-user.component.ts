import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { MainscreenService } from  '../../main-screen/mainscreen.service';

import { User } from './User';
import { AdminServiceService } from '../admin-service.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
id
  isRegSpinning = false;
  isLogSpinning = false;
  registerModel = new User();
  formData = new FormData();
  large
  extraTemplate
  constructor(private service: AdminServiceService , private route :Router, private message: NzMessageService,private activateRoute:ActivatedRoute,private mainservice:MainscreenService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id) {

    this.getUserById();


    }
  }
  getUserById() {
    this.service.getUserById(this.id).subscribe(d=>{
      d=d.result;
      console.log("+++++++++",d,"==========");

      this.registerModel.name=d.name;
      this.registerModel.email=d.email
      this.registerModel.password="";
      this.registerModel.userType=d.userType;
      // this.registerModel.userType = d.user_type;
      this.registerModel.active = d.active;
      this.registerModel.clientId = d.clientId;


    });
  }

  accountAccessKeyy
  submit(){
    this.isRegSpinning = true;


    if(this.id)
    {
      this.service.updateUser(this.id,this.registerModel).subscribe(d=>{ //this
        this.message.success("Updated Successfully",{nzDuration:3000});
      });

    }

    else{
    console.log(this.registerModel);
    this.registerModel.userType = this.registerModel.userType;
    this.accountAccessKeyy = sessionStorage.getItem('key');
    this.registerModel.accountAccessKey=this.accountAccessKeyy;
    this.registerModel.active = true;
    if(this.registerModel.userType==="USER")
    {this.registerModel.clientId = 1;}
    else{this.registerModel.clientId=null}

    this.mainservice.registerUser(this.registerModel)
    .subscribe(
        data => {
          if(data.result.status == 200){
            console.log(data.result);
            this.registerModel.name=""
            this.registerModel.email=""
            this.registerModel.password = '';
            this.registerModel.userType=null;
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
  }

  validate(){
    if((this.registerModel.name && this.registerModel.email&&this.registerModel.userType&&this.registerModel.password)||(this.id&&this.registerModel.name && this.registerModel.email&&this.registerModel.userType)){
      return false;
    }
    else{
      return true
    }
}





}
