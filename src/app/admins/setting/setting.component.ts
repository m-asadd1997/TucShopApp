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
  Checker = false;
  id
  extraTemplate
  ngOnInit() {
    this.adminService.getSetting().subscribe(d => {

      this.Checker = true;
      if (d && d.length != 0) {
        this.id = d[0].id
        this.settingObj.header = d[0].header;
        this.settingObj.footer = d[0].footer;
        this.imgURL = d[0].logo
        this.adminService.getImage(this.imgURL).subscribe(e => {
          if (e) {
            this.settingObj.logo = e;
          }

        })
      }


    })
    this.formData.delete('header');
    this.formData.delete('logo');
    this.formData.delete('footer');
  }



  submitSetting(myForm: NgForm) {
    this.Checker = false;
    this.formData.append('header', this.settingObj.header)
    if (this.settingObj.logo) {
      this.formData.append('logo', this.settingObj.logo, "settinglogo.png")
    }
    else{

    }

    this.formData.append('footer', this.settingObj.footer)




    this.adminService.postSetting(this.formData).subscribe(d => {
      this.formData.delete('header');
      this.formData.delete('logo');
      this.formData.delete('footer');
      this.message.success('Saved successfully', {
        nzDuration: 3000

      })
    });

    myForm.reset();

    //this.formData.delete('headerName')

  }
  imagePath;
  imgURL

  handleCategoryBanner(files: FileList) {
    //console.log(files);
    this.settingObj.logo = files[0]
    this.Checker = true;


  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;


    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;

    }
  }
}
