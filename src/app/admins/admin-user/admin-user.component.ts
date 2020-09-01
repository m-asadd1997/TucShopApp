import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  constructor(private service:AdminServiceService, private route:Router,private nzMessageService: NzMessageService) { }

  usersData = []
  
  

  ngOnInit() {
   
     this.showUsers();
     
 }
  showUsers() {

    this.service.getUsers().subscribe(response=>{

      console.log(response);
      response=response.result;
    
      this.usersData=response;
    })        
    
  }

  createUser(){
    this.route.navigate(['admin/layout/add-user']);
  }

 

  


 
  deleteUser(data){


    this.usersData = this.usersData.filter(d => d.id !== data.id)
    this.service.deleteUser(data.id).subscribe(d=>{
      this.nzMessageService.success("Deleted Successfully");
    });
  }
  updateUser(id){
    this.route.navigate(['admin/layout/add-user/'+id]) 
  }
  


}
