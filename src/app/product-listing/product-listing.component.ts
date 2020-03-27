import { Component, OnInit } from '@angular/core';
import { MainscreenService } from '../main-screen/mainscreen.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageComponent } from 'ng-zorro-antd';
import { debug } from 'util';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  productsArray = [] = [];
  params: any;

  categoryHeader: any;
  count = 0;
  searchProduct:any;
  options: any;

  constructor(private prodService: MainscreenService, private activeRoute: ActivatedRoute) { }


  ngOnInit() {

    // this.prodService.productQuantityUpdateToProductListing$.subscribe(d => {

    //   let index = this.productsArray.findIndex(prod => {

    //     return prod.name == d.productTitle
    //   });
    //   this.productsArray[index].qty = d.productqty;
    // })



    this.activeRoute.paramMap.subscribe(
      params => {
          
          
        this.getProducts(params['params'].category)
        this.categoryHeader = params['params'].category;

      }
    );
    this.getAllProducts();
    
  }

  
  
  
  
  getProducts(str: any) {

    if (str === "Products") {
      this.getAllProducts();
      
      
    }
    else {

      this.prodService.getProducts(str).subscribe(d => {
        
        if (d) {
          d.result = d.result.filter(e => (e.qty > 0))
          this.productsArray = d.result;
          console.log(this.productsArray);
          
        }
        
       
      })
    }
  }
  checking: boolean = true;
  checking1: boolean = true;
  sendProducttoCheckout(prod, card) {

    this.prodService.getProductsById(prod.id).subscribe(d => {
      
      if (d) {
        prod.qty = d.qty
        console.log("==============Send Product To Checkout===============", d.qty)
        this.checking1 = true;

        if (prod.qty == 0 && this.checking1) {
          this.checking1 = false
          console.log("==============IF===============")

        }
        else if (this.checking1) {
          console.log("==============ELSE===============")
          this.checking1 = false
          var obj = {
            "qty": prod.qty
          }

          this.prodService.updateAddQuantity(prod.id, obj).subscribe(d => {
            // //console.log(d);
            if (d) {
              prod.qty = d.result.qty
              this.checking = true;
            }
            console.log(prod);
            if (this.checking) {
              this.prodService.sendMessage(prod);
              this.checking = false;

            }

          });




        }


      }
    });


  }

  getAllProducts() {
    this.prodService.getAllProducts().subscribe(d => {
      if (d) {
        d = d.filter(e => (e.qty > 0))
        this.productsArray = d;
      }


    })
  }

searchProductByKeyword(value:any){
this.prodService.searchProductByKeyword(value).subscribe(d=>{
 if (d){

  this.searchProduct = d.result;
  this.productsArray = this.searchProduct;
 } 
 
});
}
onChange(value: string): void {
  //const value = (e.target as HTMLInputElement).value;
    if (value != null && value != "") {
      this.searchProductByKeyword(value);
      //this.productsArray = this.searchProduct;
     //console.log(this.productsArray)

    }
     else {
     this.getAllProducts();  
  
     }
    }

  }
