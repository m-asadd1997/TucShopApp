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
  switchValue=false;
  extraTemplate
  categories = []
  large
  addProducts: addProduct;
  formData = new FormData();
  checker: boolean = false;
  inputValue: string;
  options: Array<{ variants: string; category: string; count: number }> = [];
  variants: any;

  imagePath;
  imgURL: any;
  message2: string;
  Checker: Boolean = false;

  typeBool = false;


  constructor(private fb: FormBuilder, private service: AdminServiceService, private activateRoute: ActivatedRoute, private message: NzMessageService) {
    this.addProducts = new addProduct();
    console.log(this.addProducts)
  }


  getVariants(value: any) {
    this.service.getVariants(value).subscribe(d => {
      console.log("======", d.result);
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
    let idObj = this.categories.find(v => v.name == this.addProducts.category);
    this.formData.append('category', idObj.id);

    if (this.addProducts.image) {
      console.log("HELLLLLLOOOOO")
      this.formData.append('image', this.addProducts.image, this.addProducts.productTitle + ".png");
    }
    else {
      // this.formData.append('image', null)
      console.log("ELSEEEE")
    }
    this.formData.append('costprice', this.addProducts.costPrice);
    this.formData.append('price', this.addProducts.salePrice);   //sale price
   (this.switchValue)? this.formData.append('quantity', "0") : this.formData.append('quantity', this.addProducts.productQuantity)

    this.formData.append('variants', this.addProducts.variants.toUpperCase());
    console.log(this.addProducts.variants);


    if (this.id != null) {


      if (Number(this.addProducts.salePrice) <= Number(this.addProducts.costPrice)) {
        this.message.warning("Sale Price Must be Greater than Cost Price ");
        this.erasingFormData();
      }
      // else if (this.addProducts.image == null) { this.message.warning("Set Image First") ;this.erasingFormData();}

      else {
        console.log(this.formData)
        //
        this.service.updateProduct(this.id, this.formData).subscribe(d => {

          this.message.success("Updated Successfully", { nzDuration: 3000 });
        }
        );


        myForm.reset();

        console.log(this.addProducts.image)
        this.Checker = true;

        this.imgURL = null;
      }

    }

    else {

      if (Number(this.addProducts.salePrice) < Number(this.addProducts.costPrice)) { this.message.warning("Sale Price Must be Greater than Cost Price "); this.erasingFormData(); }
      // else if (this.addProducts.image == null) { this.message.warning("Set Image First"); this.erasingFormData(); }
      else {
        this.service.postProduct(this.formData).subscribe(d => {
          console.log(d);
          if (d.status != 200) this.message.error("Duplicate Product", { nzDuration: 3000 });
          else this.message.success("Added Successfully", { nzDuration: 3000 });

        });
        this.addProducts.image = null;
        myForm.reset();
        this.erasingFormData();

        console.log(this.addProducts.image)

        this.imgURL = null;
        this.Checker = true;
        console.log(this.addProducts.image)

      }
    }

  }

  handleCategoryBanner(files: FileList) {
    //console.log(files);
    this.addProducts.image = files[0]
    this.Checker = true;


  }

  ngOnInit(): void {

    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id) {
      this.checker = true;
      this.Checker = true;//ye image waala hai
      this.getProducts();


    }
    this.getCategories();

  }


  getCategories() {
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

      this.service.getImage(d.image).subscribe(e => {
        if (e) {
          this.addProducts.image = this.blobToFile(e, "abc");
        }
      })


      this.addProducts.variants = d.variants
      this.imgURL = d.image
      this.Checker = true;

      console.log(this.addProducts.category)


    })
  }
  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.filename = fileName;
    return theBlob;
  }






  isInputValid(form) {
    if ((form.valid && (this.addProducts.variants != "" || this.addProducts.variants)) || (form.valid && this.checker)) {
      return false;
    }
    else {
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


  erasingFormData() {
    this.formData.delete("name");
    this.formData.delete("category");
    this.formData.delete("image");
    this.formData.delete("costprice");
    this.formData.delete("price");
    this.formData.delete("quantity");
    this.formData.delete("variants");
  }
  switchChanged(){
    console.log(this.switchValue);
    this.switchValue=!this.switchValue;
    this.addProducts.productQuantity=null
  }

}
