import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { addProduct } from './addProduct';
import {  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  categories=[]
  addProducts:addProduct= new addProduct();
  submitForm(): void {
    
  }
  submit(){
    // console.log(this.addProducts);
   this.service.postProduct("http://localhost:3004/products",this.addProducts).subscribe();
  }

  constructor(private fb: FormBuilder,private service:AdminServiceService) {}

  ngOnInit(): void {
  this.getCategories();
  }
  getCategories(){
    this.service.getProducts("http://localhost:3004/categories/").subscribe((d)=>{
      //  this.categories.push(d.name)
      //  console.log(d)
      d.forEach(element => {
        // console.log(element)
        this.categories.push(element.name)
        console.log(this.categories)
  
      });
     })
  }

}
