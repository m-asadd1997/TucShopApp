import { Component, OnInit } from "@angular/core";
import { MainscreenService } from "../main-screen/mainscreen.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  checkoutProductsArray  = [];
  productQuantity = 0;
  total = 0;
  constructor(private interactionServ: MainscreenService) {}

  ngOnInit() {
    this.interactionServ.productMessage$.subscribe(d => {
      
       let found = this.checkoutProductsArray.findIndex(p=>p.productTitle == d['productTitle']); 
        console.log(found)
        if(found > -1){
            this.checkoutProductsArray[found].productPrice = this.checkoutProductsArray[found].productPrice + d['productPrice']; 
            this.total = this.total + d['productPrice']
        }else{
          this.checkoutProductsArray.push(d);
          this.total += d['productPrice'];
          
        }
    });
  }
}
