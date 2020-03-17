import { Component, OnInit } from '@angular/core';
import { MainscreenService } from '../main-screen/mainscreen.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  productsArray = [] = [];
  params: any;
  categoryHeader:any;

  constructor(private prodService: MainscreenService, private activeRoute: ActivatedRoute) { }


  ngOnInit() {

    this.prodService.productQuantityUpdateToProductListing$.subscribe(d=>{
      console.log(d);
      console.log(this.productsArray)
      let index=this.productsArray.findIndex(prod=>{
        
        return   prod.name==d.productTitle
      });
     this.productsArray[index].qty=d.productqty;
    })



    this.activeRoute.paramMap.subscribe(
      params => {

        this.getProducts(params['params'].category)
        this.categoryHeader= params['params'].category;
      }
    );
    this.getAllProducts();
  }

  getProducts(str: any) {

    this.prodService.getProducts(str).subscribe(d => {
      this.productsArray = d.result;
    })
  }

  sendProducttoCheckout(prod,card) {
    if (prod.qty <= 0) {
    console.log(card)
    }
    else {
      prod.qty--;
      this.prodService.sendMessage(prod);
    }
  }

  getAllProducts() {
    this.prodService.getAllProducts().subscribe(d => {
      this.productsArray = d;
    })
  }
}
