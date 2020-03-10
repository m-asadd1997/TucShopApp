import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { addProduct } from './addProduct';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  id: any;
  categories = []
  addProducts: addProduct = new addProduct();
  formData = new FormData();


  constructor(private fb: FormBuilder, private service: AdminServiceService, private activateRoute: ActivatedRoute, private message: NzMessageService) { }
  submitForm(): void {

  }
  submit(myForm: NgForm) {
debugger
    console.log(this.formData);
    //debugger
    this.formData.append('name', this.addProducts.productTitle)
    this.formData.append('category', this.addProducts.category);

    this.formData.append('image', this.addProducts.image);
    this.formData.append('costprice', this.addProducts.costPrice);
    this.formData.append('price', this.addProducts.salePrice);   //sale price
    this.formData.append('quantity', this.addProducts.productQuantity);
    console.log(this.formData);
    if (this.id != null) {
     
     
      if (Number( this.addProducts.salePrice) <= Number( this.addProducts.costPrice)) 
      { 
        this.message.warning("Sale Price Must be Greater than Cost Price ") 
      }
      else if(this.addProducts.image==null){this.message.warning("Set Image First")}  

      else 
      {
        this.service.updateProduct(this.id, this.formData).subscribe(d => 
          {
          this.message.success("Updated Successfully", { nzDuration: 3000 });
        }
        );


        myForm.reset();
        this.formData.delete("name");
        this.formData.delete("category");
        this.formData.delete("image");
        this.formData.delete("costprice");
        this.formData.delete("price");
        this.formData.delete("quantity");
        console.log(this.addProducts.image)
        this.addProducts.image = null;
        console.log(this.addProducts.image)
      }

    }

    else {

      if (Number( this.addProducts.salePrice) <= Number( this.addProducts.costPrice)) { this.message.warning("Sale Price Must be Greater than Cost Price ") }
      else if(this.addProducts.image==null){this.message.warning("Set Image First")}
      else {
        this.service.postProduct(this.formData).subscribe(d => {
          this.message.success("Added Successfully", { nzDuration: 3000 });
        });
        this.addProducts.image = null;
        myForm.reset();
        this.formData.delete("name");
        this.formData.delete("category");
        this.formData.delete("image");
        this.formData.delete("costprice");
        this.formData.delete("price");
        this.formData.delete("quantity");
        console.log(this.addProducts.image)
        this.addProducts.image = null;
        console.log(this.addProducts.image)
      }
    }

  }

  handleCategoryBanner(files: FileList) {
    console.log(files);
    this.addProducts.image = files[0]


  }

  ngOnInit(): void {

    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id)
      this.getProducts();
    this.getCategories(this.id);

  }


  getCategories(id) {
    this.service.getCategory().subscribe(d => {
      this.categories = d;
    })
  }

  getProducts() {
    this.service.getProductsById(this.id).subscribe(d => {
      this.addProducts.productTitle = d.name
      this.addProducts.costPrice = d.costprice
      this.addProducts.productQuantity = d.qty
      this.addProducts.salePrice = d.price
      this.addProducts.category = d.name
      this.addProducts.image = d.image
    })
  }
}