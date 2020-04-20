import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  constructor(private service:AdminServiceService, private route:Router) { }

  usersData = []
  
  

  ngOnInit() {
   
     this.showUsers();
     
 }
  showUsers() {

    this.service.getUsers().subscribe(response=>{

      console.log(response);
      this.usersData=response;
    })        
    
  }

  createUser(){
    this.route.navigate(['admin/layout/add-user']);
  }

  // deleteProduct(data){
  //  this.service.deleteProduct(data.id).subscribe();
  //  this.Products = this.Products.filter(d => d.id !== data.id);

  // }
  // updateProduct(id){
  //   this.router.navigate(['/admin/layout/add-product',id])

  // }

  


 

  


}
