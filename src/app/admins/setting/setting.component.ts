import { Component, OnInit } from '@angular/core';
import { setting } from './setting';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private adminService: AdminServiceService) { }

  settingObj: setting = new setting();
  formData = new FormData();

  ngOnInit() {
  }


  handleLogo(file: FileList) {
    this.settingObj.logo = file[0];

  }

  submitSetting() {
    this.formData.append('header', this.settingObj.header)
    this.formData.append('logo', this.settingObj.logo)
    this.formData.append('footer', this.settingObj.footer)
    console.log(this.settingObj.logo);
    console.log(this.settingObj.header);
    console.log(this.settingObj.footer);
    
    this.adminService.postSetting(this.formData).subscribe();
  }
  
}
