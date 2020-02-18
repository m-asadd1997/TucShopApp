import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  
  constructor( private router:Router) { }

  ngOnInit() {
  }
  listProduct(){

  //this.router.navigate (['/product'])
   
  }
  addProduct(){
    
  }
  listCategory(){
    
  }
  addCategory(){
    
  }
  navigateBackToHomePage(){
    this.router.navigate(['home'])
  }
  navigateBackToLoginPage(){
    this.router.navigate(['admin'])
  }

}
