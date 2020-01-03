import { Component, OnInit } from '@angular/core';
import { MainscreenService } from '../main-screen/mainscreen.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  productsArray = [] = [];
  constructor(private prodService:MainscreenService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.prodService.getProducts().subscribe(d=>{
      this.productsArray = d;
    })
  }

  sendToCheckout(prod :Object){
    this.prodService.sendMessage(prod);
  }
}
