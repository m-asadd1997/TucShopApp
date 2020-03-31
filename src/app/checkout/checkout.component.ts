import { Component, OnInit, ViewEncapsulation, Input, HostListener } from "@angular/core";
import { MainscreenService } from "../main-screen/mainscreen.service";
import { NzModalService, ButtonConfig, NzButtonComponent } from "ng-zorro-antd";
import { Checkout } from './Checkout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from '@angular/compiler/src/util';
import { debug } from 'util';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {

  
    this.checkoutProductsArray.forEach(data=>{
      let  obj={
        "quantity":0,
        "count":data.productQuantity
      }
      this.interactionServ.updateMinusAllQuantity(data.id,obj).subscribe(d=>{
        if(d)
        {
          data.productqty=d.result.qty
          let index = this.checkoutProductsArray.findIndex(p => p.id == data.id);
          this.total = this.total - this.checkoutProductsArray[index].productPrice;
          this.checkoutProductsArray.splice(index, 1);
        }
      })

    })

   
 }
  checkoutProductsArray = [];
  productQuantity = 0;
  total = 0;
  isVisible = false;
  addButtonDisbale = false;
  isOkLoading:boolean;
  // minusButtonDisbale = false;
  isVisible2 = false;
  imageVisible = false;
  inputValue: string;
  options: Array<{ name: string; countName: number }> = [];
  checkOutObj: Checkout = new Checkout();
  checking:boolean=false; 

  cols: { header: string; }[];
  requestProduct: any;
  constructor(
    private interactionServ: MainscreenService,
    private message: NzMessageService
  ) { }
chekingSetting=false;
  ngOnInit() {
    this.interactionServ.getSetting().subscribe(d => {
     
      if(d){
      this.settingHeader = d[0]; 
        this.chekingSetting=true;
    }
       
      // if (!this.settingHeader) {
      //   this.settingHeader = {
      //     header: "",
      //     logo: '',
      //     footer: "",
      //     headerName: ""
      //   }

      // }
      // else if (this.settingHeader.headerName == undefined) {
      //   this.settingHeader.headerName = ""
      // }
      // else if (this.settingHeader.header == undefined) { this.settingHeader.header = "" }
      // else if (this.settingHeader.footer == undefined) { this.settingHeader.footer = "" }
      // else if (this.settingHeader.logo == undefined) { this.settingHeader.logo = "" }
      // else { this.imageVisible = true }
    });

    this.populateCols();

    this.interactionServ.productMessage$.subscribe(d   => {
    //  debugger
      if(d){
      let found = this.checkoutProductsArray.findIndex(
        p => p.productTitle == d["name"]
      );
      
       
      if (d['qty'] <= 0) {
        this.addButtonDisbale = true;
      
      }


      if (found > -1) {
        this.checkoutProductsArray[found].productPrice += d["price"];
        this.total = this.total + d["price"];
        this.checkoutProductsArray[found]["productQuantity"] += 1;
        this.checkoutProductsArray[found].productqty = d["qty"];
      
      } else {
        this.checkoutProductsArray.push({
          id: d["id"],
          productTitle: d["name"],
          productPrice: d["price"],
          productImage: d["image"],
          productQuantity: this.productQuantity = 1,
          productqty: d['qty'],
          printProductPrice: d["price"]

        }
        );
        this.total += d["price"];

      }}
    });
  }

  removeProductFromCheckout(data) {
    let obj1={
    "quantity":0
    ,"count":data.productQuantity
    }
    console.log("===========================",data)
    this.interactionServ.updateMinusAllQuantity(data.id,obj1).subscribe(d=>{
      if(d){
      data.productqty=d.result.qty
      let index = this.checkoutProductsArray.findIndex(p => p.id == data.id);
      this.total = this.total - this.checkoutProductsArray[index].productPrice;
      this.checkoutProductsArray.splice(index, 1);
  
    }
    })
   
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }


  saveTransaction() {
    let request = {
      amount: this.total,
      products: this.checkoutProductsArray
    }
    this.interactionServ.saveTransaction(request).subscribe(
      data => {
        this.message.success('amount added successfully', {
          nzDuration: 3000
        });
      },


    )


  }


  handleCancel(): void {
    this.isVisible = false;
    this.isVisible2 = false;
    // this.total = 0;
  }

  showModal2(): void {
    this.isVisible2 = true;
  }


  addProduct(obj) {
    // this.checking=true
    console.log(obj)
    this.interactionServ.getProductsById(obj["id"]).subscribe(d=>{
      if(d){
      obj.productqty = d.qty;
      console.log(  "==============Add Product===============",d.qty)
      console.log(  "==============Checking===============")

      
      this.checking=true;
      let index = this.checkoutProductsArray.findIndex(p => p.id == obj["id"]);

    var obj1 = {
      "qty": 0
    }

  
    


    
    if (obj.productqty != 0&&this.checking) {
      this.checking=false;

      console.log(  "==============IF===============")

      this.interactionServ.updateAddQuantity(obj["id"], obj).subscribe(d => {
        if(d) 
        obj.productqty = d.result.qty;
        })
        
      let productPrice = obj.printProductPrice
      this.total = this.total + productPrice;
      this.checkoutProductsArray[index].productPrice += productPrice;

      this.checkoutProductsArray[index]["productQuantity"] += 1;
          
    }
      }
     
    })
      
    

  }
  checkingMinusCall=false;
  removeProduct(obj) {

    let obj1={
      "quantity":0
      ,"count":obj.productQuantity
      }
    // this.checkingMinusCall=true;
 
    this.interactionServ.updateMinusQuantity(obj["id"], obj1).subscribe(d => {
      if(d){
        this.checkingMinusCall=true;
      obj.productqty = d.result.qty;
      
      console.log(  "============== d of Minus Call  ===============",d)
      if(this.checkingMinusCall){
      
        console.log(  "==============IF Of Minus===============")
        this.checkingMinusCall=false;
      let index = this.checkoutProductsArray.findIndex(p => p.id == obj["id"]);
      let productPrice = obj.printProductPrice;
      this.total = this.total - productPrice;
      this.checkoutProductsArray[index].productPrice = this.checkoutProductsArray[index].productPrice - productPrice;
     
  
  
      if (this.checkoutProductsArray[index]['productQuantity'] <= 1) {
        this.checkoutProductsArray.splice(index, 1);
  
      } else {
        this.checkoutProductsArray[index]["productQuantity"] -= 1;
      }}  
       
    }
    });

    

  }


  
  checkingQunatity(data){
    if(data.productqty>0)
    {

      return true;
    }
    else {
      return false;
    }
  }
  disableButton() {
    if (!this.checkOutObj.name) {
      return true;
    }
    else {
      return false;
    }
  }

  // saveTransaction() {
    
  //   let request = {
  //     amount: this.total,
  //     products: this.checkoutProductsArray   
  //   }
  //   this.interactionServ.saveTransaction(request).subscribe(
  //     data => {
  //       //console.log(data);
  //       this.message.success('amount added successfully', {
  //         nzDuration: 3000
  //       });
  //     },
  //   )
  // }






  settingHeader
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

  populateCols() {
    this.cols = [
      { header: "Product Name" },
      { header: "Product Price" },
      { header: "Product Quantity" },
      { header: "Price" },

    ];
  }

  postProduct() {
    this.interactionServ.postRequestedProduct(this.checkOutObj).subscribe(d => {
      this.message.success('Requested Product saved successfully', {
        nzDuration: 3000
      });
      this.checkOutObj.name="";
    });
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (value != null && value != "") {
      this.getRequestForProductCount(value);
      this.options = this.requestProduct;
    }

  }

  getRequestForProductCount(value: any) {
    this.interactionServ.getRequestForProductCount(value).subscribe(d => {
      this.requestProduct = d.result;
      ////  .log(this.requestProduct);

    });
  }
}
