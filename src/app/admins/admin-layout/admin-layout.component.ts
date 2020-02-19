import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  productVisible=false;
  addProductVisible=false;
  categoryVisible=false;
  addCategoryVisible=false;
  transactionsVisible=false;
  userTransactionsVisible=false;
  constructor( private router:Router) { }

  ngOnInit() {
  }
  showList(){
    this.addProductVisible=false;
    this.categoryVisible=false;
    this.productVisible=true;
    this.addCategoryVisible=false;
    this.transactionsVisible=false;
    this.userTransactionsVisible=false;
  }
  addProduct(){
    this.productVisible=false;
    this.addProductVisible=true;
    this.categoryVisible=false;
    this.addCategoryVisible=false;
    this.transactionsVisible=false;
    this.userTransactionsVisible=false;
  }
  listCategory(){
    this.productVisible=false;
    this.addProductVisible=false;
    this.categoryVisible=true;
    this.addCategoryVisible=false;
    this.transactionsVisible=false;
    this.userTransactionsVisible=false;
  }
  addCategory(){
    this.addProductVisible=false;
    this.categoryVisible=false;
    this.productVisible=false;
    this.addCategoryVisible=true;
    this.transactionsVisible=false;
    this.userTransactionsVisible=false;
  }
  listTransactions(){
    this.addProductVisible=false;
    this.categoryVisible=false;
    this.productVisible=false;
    this.addCategoryVisible=false;
    this.transactionsVisible=true;
    this.userTransactionsVisible=false;
  }
  userTransactions(){
    this.addProductVisible=false;
    this.categoryVisible=false;
    this.productVisible=false;
    this.addCategoryVisible=false;
    this.transactionsVisible=false;
    this.userTransactionsVisible=true;
  }
  navigateBackToHomePage(){
    this.router.navigate(['home'])
  }
  navigateBackToLoginPage(){
    this.router.navigate(['admin'])
  }

}
