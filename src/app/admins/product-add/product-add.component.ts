import { ToastrService } from "ngx-toastr";
import { AdminServiceService } from "./../admin-service.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { addProduct } from "./addProduct";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageComponent, NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"],
})
export class ProductAddComponent implements OnInit {
  id: any;
  switchValue = false;
  extraTemplate;
  categories = [];
  large;
  addProducts: addProduct;
  formData = new FormData();
  checker: boolean = false;
  inputValue: string;
  options: Array<{ variants: string; category: string; count: number }> = [];
  variants: any;
  fileList = [];
  imagePath;
  imgURL: any;
  message2: string;
  Checker: Boolean = false;
  onlineProductSwitch: Boolean = false;
  i = 0;
  subCategories = []
  typeBool = false;

  constructor(
    private fb: FormBuilder,
    private service: AdminServiceService,
    private activateRoute: ActivatedRoute,
    private message: NzMessageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.addProducts = new addProduct();
    console.log(this.addProducts);
  }

  getVariants(value: any) {
    this.service.getVariants(value).subscribe((d) => {
      console.log("======", d.result);
      this.variants = d.result;
    });
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (value != null && value != "") {
      this.getVariants(value);
      this.options = this.variants;
    }
  }

  submitForm(): void {}

  submit(myForm: NgForm) {
    
    debugger
    if (
      Number(this.addProducts.salePrice) <= Number(this.addProducts.costPrice)
    ) {
      this.toastr.error("Sale Price Must be Greater than Cost Price");
      // this.message.warning("Sale Price Must be Greater than Cost Price ");
      return;
    }
    this.processingFormData();
   

    if (this.id != null) {
      console.log(this.formData);

      this.service.updateProduct(this.id, this.formData).subscribe((d) => {
        if (d.status == 200) {
          this.toastr.success(d.message);
          myForm.reset();
          this.router.navigate(["admin/layout/product"]);
        } else {
          this.toastr.error(d.message);
        }
      });

      console.log(this.addProducts.image);
      this.Checker = true;
    } else {
      if (
        Number(this.addProducts.salePrice) < Number(this.addProducts.costPrice)
      ) {
        this.toastr.error("Sale Price Must be Greater than Cost Price");
        this.erasingFormData();
      }
      // else if (this.addProducts.image == null) { this.message.warning("Set Image First"); this.erasingFormData(); }
      else {
        this.service.postProduct(this.formData).subscribe((d) => {
          console.log(d);
          // debugger;
          if (d.status != 200) {
            this.toastr.error(d.message);
            this.formData = new FormData();
          } else {
            this.toastr.success(d.message);
            this.router.navigate(["admin/layout/product"]);
          }
        });
        // this.addProducts.image = null;

        console.log(this.addProducts.image);

        // this.imgURL = null;
        this.Checker = true;
        console.log(this.addProducts.image);
        myForm.reset();
        this.erasingFormData();
      }
    }
  }

  private processingFormData() {
    this.formData = new FormData();
    this.formData.append("name", this.addProducts.productTitle);
    let idObj = this.categories.find(
      (v) => v.name == this.addProducts.category
    );
    this.formData.append("category", idObj.id);
    if (this.addProducts.image) {
      this.formData.append(
        "image",
        this.addProducts.image,
        this.addProducts.productTitle + ".png"
      );
    }

    this.formData.append("costprice", this.addProducts.costPrice);
   
    if(this.addProducts.parentID)
    {
      this.formData.append('category',this.addProducts.parentID);
    }
    else{
      let idObj = this.categories.find(v => v.name == this.addProducts.category);
    this.formData.append('category', idObj.id);
    }

    if (this.addProducts.image) {
      this.formData.append('image', this.addProducts.image, this.addProducts.productTitle + ".png");
    }

    this.formData.append('costprice', this.addProducts.costPrice);
    if (this.addProducts.sku != null) {
      this.formData.append("sku", this.addProducts.sku);
    }
    this.formData.append("price", this.addProducts.salePrice); //sale price
    this.switchValue
      ? this.formData.append("quantity", "0")
      : this.formData.append("quantity", this.addProducts.productQuantity);
    this.formData.append("variants", this.addProducts.variants.toUpperCase());
    this.formData.append(
      "onlineProduct",
      this.addProducts.onlineProduct.toString()
    );
    this.fileList.forEach((f) => this.formData.append("productImages", f.file));
    console.log(this.addProducts.variants);
  }

  handleCategoryBanner(files: FileList) {
    //console.log(files);
    this.addProducts.image = files[0];
    this.Checker = true;
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params["id"];
    if (this.id) {
      this.checker = true;
      this.Checker = true; //ye image waala hai
      this.getProducts();
    }
    this.getCategories();
  }

  getCategories() {
    this.service.getCategory().subscribe((d) => {
      this.categories = d;
    });
  }

  getProducts() {
    this.service.getProductsById(this.id).subscribe((d) => {
      this.addProducts.productTitle = d.name;
      this.addProducts.costPrice = d.costprice;
      this.addProducts.productQuantity = d.qty;
      this.addProducts.salePrice = d.price;
      this.addProducts.category = d.category.name;
      this.addProducts.sku = d.sku;
      this.addProducts.productGalleryImages = d.productGalleryImages;
      this.addProducts.onlineProduct = d.onlineProduct;
     
      console.log("Product Gallery Images",this.addProducts.productGalleryImages)
      this.setOnlineProductSwitch();

      this.service.getImage(d.image).subscribe((e) => {
        if (e) {
          this.addProducts.image = this.blobToFile(e, "abc");
        }
      });
      let that = this;
      this.addProducts.productGalleryImages.forEach((img) => {
        that.service.getImage(img.image).subscribe((i) => {
          this.showFiles(
            new File([i], `abc${this.i++}.jpg`, { lastModified: 1534584790000 })
          );
        });
      });

      this.addProducts.variants = d.variants;
      this.imgURL = d.image;
      this.Checker = true;

      console.log(this.addProducts.category);
    });
  }
  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.filename = fileName;
    return theBlob;
  }

  setOnlineProductSwitch(){
    if(this.addProducts.onlineProduct === "yes") this.onlineProductSwitch = true
    else this.onlineProductSwitch = false;
  }

  

  showFiles(file) {
    let reader = new FileReader();
    try {
      reader.onload = this._handleReaderLoaded.bind(this, file);
      reader.readAsBinaryString(file);
    } catch (e) {}
  }

  isInputValid(form) {
    if (
      (form.valid &&
        this.addProducts.image != null &&
        (this.addProducts.variants != "" || this.addProducts.variants)) ||
      (form.valid && this.checker)
    ) {
      return false;
    } else {
      return true;
    }
  }

  preview(files) {
    if (files.length === 0) return;

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
    };
  }

  erasingFormData() {
    this.formData.delete("name");
    this.formData.delete("category");
    this.formData.delete("image");
    this.formData.delete("costprice");
    this.formData.delete("price");
    this.formData.delete("quantity");
    this.formData.delete("variants");
    this.Checker = false;
  }
  switchChanged() {
    console.log(this.switchValue);
    this.switchValue = !this.switchValue;
    this.addProducts.productQuantity = null;
  }

  onlineSwitch() {
    if (this.onlineProductSwitch) {this.addProducts.onlineProduct = "no"; this.fileList = []}
    else {this.addProducts.onlineProduct = "yes";}
    console.log(this.addProducts.onlineProduct, this.fileList);
  }

  _handleReaderLoaded(file, readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = btoa(binaryString);
    //console.log(btoa(binaryString));
    this.fileList.push({
      file,
      base64: base64textString,
    });
  }

  deleteImage(i) {
    this.fileList.splice(i, 1);
  }

  onFileChange(event) {
    let reader = new FileReader();
    console.log(event);
    try {
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.onload = this._handleReaderLoaded.bind(this, file);
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      console.log(error);
    }
    }
  categoryID;

  changeCategory(item) {
    console.log(this.categories)

    this.categories.map(category => {
      console.log(category);
      if (category.name == item) {
        this.categoryID = category.id;
      }


    })

    this.service.getSubCategories(this.categoryID).subscribe((response:any)=>{
      console.log("RESPONSE",response);
      this.subCategories =response.result;

    })

  }
  routeToAddCategory(){
    this.router.navigate(['admin/layout/add-category'])
  }
  changeSubCategory(obj){
    setTimeout(() => {
      console.log(this.addProducts.parentID);
    }, 1000);


  }
}
