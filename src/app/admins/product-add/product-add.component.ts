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
  formData=new FormData();
  submitForm(): void {
    
  }
  submit(){
    // console.log(this.addProducts);
    this.formData.append('name',this.addProducts.productTitle)
    
    this.formData.append('category',this.addProducts.category);
    this.formData.append('image',this.addProducts.image);
    // console.log(typeof( this.addProducts.image))

    this.formData.append('costprice',this.addProducts.costPrice);
    this.formData.append('price',this.addProducts.salePrice);
    this.formData.append('quantity',this.addProducts.productQuantity);
    //this.formData.append('description',this.addProducts.description);

    //this.formData.append('productQuatity',this.addProducts.productQuantity);
    //this.formData.forEach(d=>{
     // console.log(d);
    

    

    
  this.service.postProduct(this.formData).subscribe(
    d=>{
      console.log(d);
    }
  );

  }

  handleCategoryBanner(files: FileList) {
    console.log(files);
    this.addProducts.image=files[0]
    // this.formData.append('category_banner', files[0], files[0].name);
   
  }

  constructor(private fb: FormBuilder,private service:AdminServiceService) {}

  ngOnInit(): void {
  this.getCategories();
  }
  getCategories(){
    this.service.getCategory().subscribe(d=>{
      //  this.categories.push(d.name)
      //console.log(d)
      this.categories = d;
      //console.log(d)
      
      // d.forEach(element => {
      //   console.log(element)
      //   this.categories.push({id:element.id,name:element.name})
      //   // console.log(this.categories)
  
      // });
     })
  }

}