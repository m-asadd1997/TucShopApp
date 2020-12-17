import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';
import { theme } from './theme';

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.css']
})
export class ThemeSettingsComponent implements OnInit {

  constructor(private adminService:AdminServiceService, private toastr: ToastrService, private router:Router,private message:NzMessageService, private activateRoute: ActivatedRoute) { }

  themeSettingObject: theme = new theme();
  
  
  
  ngOnInit() {
  }


  saveThemeSetting(){
  this.adminService.themeSetting(this.themeSettingObject).subscribe(d=>{
  if(d.status==200){  
  this.toastr.success(d.message);
  }  
  });
  }


}
