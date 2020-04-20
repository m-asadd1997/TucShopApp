import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { MainscreenService } from  '../../main-screen/mainscreen.service';

import { User } from './User';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isRegSpinning = false;
  isLogSpinning = false;
  registerModel = new User();
  formData = new FormData();


  constructor(private service: MainscreenService , private route :Router, private message: NzMessageService) { }

  ngOnInit() {
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
            this.route.navigate(['admin/layout/admin-user']);
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

  validate(){
    if(this.registerModel.name && this.registerModel.email){
      return false;
    }
    else{
      return true
    }
}

erasingFormData() {
  this.formData.delete("name");
  this.formData.delete("email");


}



}
