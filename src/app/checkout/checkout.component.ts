import { Component, OnInit } from "@angular/core";
import { MainscreenService } from "../main-screen/mainscreen.service";
import { NzModalService } from "ng-zorro-antd";
import { Checkout } from './Checkout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  checkoutProductsArray = [];
  productQuantity = 0;
  total = 0;
  isVisible = false;
  isVisible2 = false;
  checkOutObj : Checkout = new Checkout();
 
  cols: {  header: string; }[];
  constructor(
    private interactionServ: MainscreenService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.populateCols();

    this.interactionServ.productMessage$.subscribe(d => {
      console.log("d================",d);

      let found = this.checkoutProductsArray.findIndex(
        p => p.productTitle == d["name"]
      );
      console.log(found);
      console.log(d)
      if (found > -1) {
        this.checkoutProductsArray[found].productPrice =
          this.checkoutProductsArray[found].productPrice + d["price"];
        this.total = this.total + d["price"];
        this.checkoutProductsArray[found]["productQuantity"] =
          this.checkoutProductsArray[found]["productQuantity"] + 1;
      } else {
        this.checkoutProductsArray.push({
          id: d["id"],
          productTitle: d["name"],
          productPrice: d["price"],
          productImage: d["image"],
          productQuantity: this.productQuantity = 1,
          printProductPrice: d["price"]
        });
      
        this.total += d["price"];
        
      }
    });
  }

  removeProductFromCheckout(data: Object) {
    let index = this.checkoutProductsArray.findIndex(p => p.id == data["id"]);
    this.total = this.total - this.checkoutProductsArray[index].productPrice;
    this.checkoutProductsArray.splice(index, 1);
    
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  saveTransaction(){
    let request = {
      amount:this.total,
      products:this.checkoutProductsArray
    }
    this.interactionServ.saveTransaction(request).subscribe(
      data=>{
        console.log(data);
        this.message.success('amount added successfully', {
          nzDuration: 3000
        });
      },
    

    )


  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisible2 = false;
    this.checkoutProductsArray = [];
    this.total = 0;
  }

  showModal2(): void {
    this.isVisible2 = true;
  }


  addProduct(obj: Object) {
    let index = this.checkoutProductsArray.findIndex(p => p.id == obj["id"]);
    let productPrice = this.checkoutProductsArray[index].productPrice / this.checkoutProductsArray[index].productQuantity;
    this.total = this.total + productPrice;
    this.checkoutProductsArray[index].productPrice += productPrice ;
    this.checkoutProductsArray[index]["productQuantity"] =  this.checkoutProductsArray[index]["productQuantity"] + 1;
  }

  removeProduct(obj: Object){
    let index = this.checkoutProductsArray.findIndex(p => p.id == obj["id"]);
    let productPrice = this.checkoutProductsArray[index].productPrice / this.checkoutProductsArray[index].productQuantity; 
    this.total = this.total - productPrice;
    this.checkoutProductsArray[index].productPrice = this.checkoutProductsArray[index].productPrice - productPrice;
    if(this.checkoutProductsArray[index]['productQuantity']<=1){
      this.checkoutProductsArray.splice(index, 1);
     
    }else{
      this.checkoutProductsArray[index]["productQuantity"] = this.checkoutProductsArray[index]["productQuantity"] - 1;
    }
    
  }


  disableButton(){
    if(!this.checkOutObj.name){
      return true;
    }
    else{
      return false;
    }
  }

  print(): void {

    this.saveTransaction();

    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
          </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.window.print();
    // popupWin.document.close();

    this.checkoutProductsArray = [];
    this.total = 0;

}

populateCols(){
  this.cols = [
    {  header: "Product Name" },
    { header: "Product Price" },
    {  header: "Product Quantity" },
    {  header: "Price" },
    
  ];
}

postProduct(){
  this.interactionServ.postRequestedProduct(this.checkOutObj).subscribe(d=>{
    this.message.success('Requested Product saved successfully', {
      nzDuration: 3000
    });
    console.log(d);
  });
}
}
