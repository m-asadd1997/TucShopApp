import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor( private router:Router) { }
  isCollapsed

adminName

  ngOnInit() {
    this.adminName=sessionStorage.getItem('username')
  }

  navigateBackToHomePage(){
    //location.href="/categories/products"
    this.router.navigate(['/categories/products'])
  }
  navigateBackToLoginPage(){
    this.router.navigate([''])
  }


}
