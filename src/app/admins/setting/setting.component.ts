import { Component, OnInit } from '@angular/core';
import { setting } from './setting';
import { AdminServiceService } from '../admin-service.service';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private adminService: AdminServiceService, private message: NzMessageService) { }

  settingObj: setting = new setting();
  formData = new FormData();
  
  ngOnInit() {
  }


  handleLogo(file: FileList) {
    this.settingObj.logo = file[0];

  }

  submitSetting(myForm: NgForm) {
    this.formData.append('header', this.settingObj.header)
    this.formData.append('logo', this.settingObj.logo)
    this.formData.append('footer', this.settingObj.footer)
    //this.formData.append('headerName',this.settingObj.headerName)
   

    

    this.adminService.postSetting(this.formData).subscribe(d => {
      this.message.success('Saved successfully', {
        nzDuration: 3000
      })
    });

    myForm.reset();
    this.formData.delete('header');
    this.formData.delete('logo');
    this.formData.delete('footer');
    //this.formData.delete('headerName')

  }
}
