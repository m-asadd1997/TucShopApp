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
  addProducts: addProduct ;
  formData = new FormData();

  inputValue: string;
  options: Array<{ variants: string; category: string; count: number }> = [];
  variants:any;
  
  imagePath;
  imgURL: any;
  message2: string;

typeBool=false;
  

  constructor(private fb: FormBuilder, private service: AdminServiceService, private activateRoute: ActivatedRoute, private message: NzMessageService) { 
    this.addProducts=new addProduct();
    console.log(this.addProducts)
  }


   getVariants(value:any){
     this.service.getVariants(value).subscribe(d=>{
       console.log("======",d.result);
       this.variants = d.result;
     })
   }

   onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (value != null && value != "") {
      this.getVariants(value);
      this.options = this.variants;
     
    }

  }

  submitForm(): void {

  }

  
  submit(myForm: NgForm) {

    this.formData.append('name', this.addProducts.productTitle)
    let idObj= this.categories.find(v=>v.name==this.addProducts.category);
    this.formData.append('category',idObj.id);
    this.formData.append('image', this.addProducts.image);
    this.formData.append('costprice', this.addProducts.costPrice);
    this.formData.append('price', this.addProducts.salePrice);   //sale price
    this.formData.append('quantity', this.addProducts.productQuantity);
    this.formData.append('variants',this.addProducts.variants.toUpperCase());
    console.log(this.formData);


    if (this.id != null) {
     
     
      if (Number( this.addProducts.salePrice) <= Number( this.addProducts.costPrice)) 
      { 
        this.message.warning("Sale Price Must be Greater than Cost Price ") 
      }
      else if(this.addProducts.image==null){this.message.warning("Set Image First")}  

      else 
      {console.log(this.formData)
        debugger
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
        this.formData.delete("variants");
        console.log(this.addProducts.image)
     
        this.addProducts.image = null;
     
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
        this.formData.delete("variants");
        console.log(this.addProducts.image)
        // this.addProducts.image = null;
        console.log(this.addProducts.image)
        
      }
    }

  }

  handleCategoryBanner(files: FileList) {
    //console.log(files);
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
      this.addProducts.category = d.category.name
      this.addProducts.image = d.image
      this.addProducts.variants=d.variants
      this.imgURL = d.image

      console.log(this.addProducts.category)
      
      
    })
  }






  isInputValid(form){
    if(form.valid&&this.addProducts.image)
    {
      return false;
    }
    else{
      return true;
    }
  }


  preview(files) {
    if (files.length === 0)
      return;
  
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message2 = "Only images are supported.";
      return;
    }
  
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      
    }
  }
}