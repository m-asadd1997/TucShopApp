import { Component, OnInit, ViewEncapsulation, Input, HostListener } from "@angular/core";
import { MainscreenService } from "../main-screen/mainscreen.service";
import { NzModalService, ButtonConfig, NzButtonComponent, NzDrawerPlacement } from "ng-zorro-antd";
import { Checkout } from './Checkout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from '@angular/compiler/src/util';
import { debug } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { count } from 'console';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {


    this.checkoutProductsArray.forEach(data => {
      let obj = {
        "quantity": 0,
        "count": data.productQuantity
      }
      this.interactionServ.updateMinusAllQuantity(data.id, obj).subscribe(d => {
        if (d) {
          data.productqty = d.result.qty
          let index = this.checkoutProductsArray.findIndex(p => p.id == data.id);
          this.total = this.total - this.checkoutProductsArray[index].productPrice;
          this.checkoutProductsArray.splice(index, 1);
        }
      })

    })


  }
  checkoutProductsArray = [];
  productsarray: any[] = [];
  productsarrayy: any[] = [];
  productQuantity = 0;
  data = [];
  total = 0;
  isVisiblee: boolean = false;
  isVisible = false;
  addButtonDisbale = false;
  isOkLoading: boolean;
  // minusButtonDisbale = false;
  isVisible2 = false;
  imageVisible = false;
  inputValue: string;
  options: Array<{ name: string; countName: number }> = [];
  checkOutObj: Checkout = new Checkout();
  checking: boolean = false;

  cols: { header: string; }[];
  requestProduct: any;
  constructor(
    private interactionServ: MainscreenService,
    private message: NzMessageService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  chekingSetting = false;
  discount
  userName: any;
  usernamee: any;
  transObj = {
    product: {},
    quantity: null,
    amount: null
  }
  isDisbled = true;
  ngOnInit() {
    // this.gettingRecentTransactions();
    this.getLoginTime();
    this.getTotalTransactionByUser();
    this.getRecentTransactionByUser();
    // this.usernamee= sessionStorage.getItem('username').toUpperCase();
    // this.usernamee = "<div class='row'> <i class='fa fa-user user'></i><h6>"+this.usernamee+"</h6></div>";
    this.fafaicon();
    console.log(this.usernamee);
    this.interactionServ.getSetting().subscribe(d => {
      this.activeRoute.paramMap.subscribe(
        params => {

          this.userName = params['params'].user;
          console.log(this.userName);

        }
      );

      if (d) {
        this.settingHeader = d[0];
        this.chekingSetting = true;
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

    // <<<<<<< variants-work
    this.interactionServ.productMessage$.subscribe(d => {
      console.log("dsfsdgsdg", d);
      if (d) {
        let found = this.checkoutProductsArray.findIndex(
          p => p.productTitle == d["name"] && p.productVariant == d["variants"]
        );


        if (d['qty'] <= 0) {
          this.addButtonDisbale = true;

        }


        if (found > -1) {
          this.checkoutProductsArray[found].productPrice += d["price"];
          // this.total = this.total + d["price"];
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
            printProductPrice: d["price"],
            productVariant: d["variants"],

            // =======
            //     this.interactionServ.productMessage$.subscribe(d => {
            //       //
            //       if (d) {
            //         let found = this.checkoutProductsArray.findIndex(
            //           p => p.productTitle == d["name"]
            //         );


            //         if (d['qty'] <= 0) {
            //           this.addButtonDisbale = true;
            // >>>>>>> master

          }


            // if (found > -1) {
            //   this.checkoutProductsArray[found].productPrice += d["price"];
            //   this.total = this.total + d["price"];
            //   this.checkoutProductsArray[found]["productQuantity"] += 1;
            //   this.checkoutProductsArray[found].productqty = d["qty"];

            // } else {
            //   this.checkoutProductsArray.push({
            //     id: d["id"],
            //     productTitle: d["name"],
            //     productPrice: d["price"],
            //     productImage: d["image"],
            //     productQuantity: this.productQuantity = 1,
            //     productqty: d['qty'],
            //     printProductPrice: d["price"]

            //   }
            //   );
            //

          )
        }
        this.total += d["price"];

      };
    })
  }

  removeProductFromCheckout(data) {
    let obj1 = {
      "quantity": 0
      , "count": data.productQuantity
    }
    console.log("===========================", data)
    this.interactionServ.updateMinusAllQuantity(data.id, obj1).subscribe(d => {
      if (d) {
        data.productqty = d.result.qty
        let index = this.checkoutProductsArray.findIndex(p => p.id == data.id);
        this.total = this.total - this.checkoutProductsArray[index].productPrice;
        this.checkoutProductsArray.splice(index, 1);

      }
    })

  }

  showModal(): void {
    this.totalAmount = 0;
    this.discountInRs = 0;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  objToPushForTransaction = [];




  saveTransaction(reqUser, action) {

    this.objToPushForTransaction = []
    console.log(this.checkoutProductsArray);

    this.checkoutProductsArray.forEach(prod => {
      let obj = {
        "product": prod,
        "quantity": prod.productQuantity
      }
      this.objToPushForTransaction.push(obj)
    });

    let request = {
      "amount": this.total,
      "requestedUser": reqUser,
      "action": action,
      "productTransactions": this.objToPushForTransaction,
      "discount": this.discountInRs

    }
    console.log(request)

    this.interactionServ.saveTransaction(request).subscribe(
      data => {
        this.getRecentTransactionByUser();
        this.getTotalTransactionByUser();
        this.fafaicon();
        this.getLoginTime();
        if (action === "SC") {
          this.message.success('Transaction Completed', {
            nzDuration: 3000
          });
        }
      },


    )



    if (action === "ROD") {
      this.checkoutProductsArray = [];
      this.total = 0;
      this.handleCancel()
    }
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
    this.interactionServ.getProductsById(obj["id"]).subscribe(d => {
      if (d) {
        obj.productqty = d.qty;
        console.log("==============Add Product===============", d.qty)
        console.log("==============Checking===============")


        this.checking = true;
        let index = this.checkoutProductsArray.findIndex(p => p.id == obj["id"]);

        var obj1 = {
          "qty": 0
        }






        if (obj.productqty != 0 && this.checking) {
          this.checking = false;

          console.log("==============IF===============")

          this.interactionServ.updateAddQuantity(obj["id"], obj).subscribe(d => {
            if (d)
              obj.productqty = d.result.qty;
          })

          let productPrice = obj.printProductPrice
          this.total = this.total + productPrice;
          this.checkoutProductsArray[index].productPrice += productPrice;

          this.checkoutProductsArray[index]["productQuantity"] += 1;

        }
      }

    })

    console.log(this.userName);


  }
  checkingMinusCall = false;
  removeProduct(obj) {

    let obj1 = {
      "quantity": 0
      , "count": obj.productQuantity
    }
    // this.checkingMinusCall=true;

    this.interactionServ.updateMinusQuantity(obj["id"], obj1).subscribe(d => {
      if (d) {
        this.checkingMinusCall = true;
        obj.productqty = d.result.qty;

        console.log("============== d of Minus Call  ===============", d)
        if (this.checkingMinusCall) {

          console.log("==============IF Of Minus===============")
          this.checkingMinusCall = false;
          let index = this.checkoutProductsArray.findIndex(p => p.id == obj["id"]);
          let productPrice = obj.printProductPrice;
          this.total = this.total - productPrice;
          this.checkoutProductsArray[index].productPrice = this.checkoutProductsArray[index].productPrice - productPrice;



          if (this.checkoutProductsArray[index]['productQuantity'] <= 1) {
            this.checkoutProductsArray.splice(index, 1);

          } else {
            this.checkoutProductsArray[index]["productQuantity"] -= 1;
          }
        }

      }
    });



  }



  checkingQunatity(data) {
    if (data.productqty > 0) {

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
  print(reqUser, action): void {

    if (!this.invalidAmount) {
      this.saveTransaction(reqUser, action);

      // let printContents, popupWin;
      // printContents = document.getElementById('print-section').innerHTML;
      // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      // popupWin.document.open();
      // popupWin.document.write(`
      //     <html>
      //       <head>
      //         <title>Print tab</title>
      //         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
      //         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      //         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
      //         </head>
      //   <body onload="window.print();window.close()">${printContents}</body>
      //     </html>`
      // );
      // popupWin.window.print();
      // popupWin.document.close();

      this.checkoutProductsArray = [];
      this.total = 0;
      this.handleCancel()

      if (action == "ROD") {
        this.message.success(`Request Sent to  ${reqUser}`, {
          nzDuration: 3000
        });
        this.isVisible1 = false;
      }
      this.amountReceived = 0;
      this.returnedAmount = 0;
    }
    else this.message.error("Checkout Failed")
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
      this.checkOutObj.name = "";
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

  navigateToUserSelection() {
    this.router.navigate(['admin/userselection']);

  }




  //////Second Modal

  user = [

  ]

  buttonDisable = false;
  func(username) {
    this.buttonDisable = true;
    this.saveTransaction(username, "ROD");
    this.message.success('Request Sent', {
      nzDuration: 3000
    });
    this.isVisible1 = false;



  }

  isVisible1 = false;



  showModal1(): void {
    this.interactionServ.getUsers().subscribe(d => {
      if (d) {
        console.log("Helllo", d);
        this.user = d.result;
        this.user = this.user.filter(user => user.userType === "DESK");
        this.isVisible1 = true;
        this.isVisible = false;
      }
    })

  }

  handleOk1(): void {
    console.log('Button ok clicked!');
    this.isVisible1 = false;
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    this.isVisible1 = false;
  }



  postTransaction(request) {

  }

  visible = false;
  placement: NzDrawerPlacement = 'right';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  handleOkk() {
    this.isVisiblee = false;
  }
  handleCancell() {
    this.isVisiblee = false;
  }

  gettingRecentTransactions() {
    this.interactionServ.recentTransactions().subscribe(response => {

      console.log(response);
      this.data = response;
    })
  }

  showproducts(productTransaction: any[]) {
    this.productsarray = productTransaction;
    this.isVisiblee = true;

  }

  checkingg() {
    if (this.data.length > 0 && this.data) {
      return true;
    }
    return false;
  }

  tranByUser = [];
  totalTrans: any;
  getRecentTransactionByUser() {
    this.usernamee = sessionStorage.getItem('username');
    this.interactionServ.getRecentTransactionByUser(this.usernamee).subscribe(r => {
      this.totalTrans = r.length;
      r.map(item => {
        item.productTransactions.map(opt => {
          this.transObj = opt;
          this.transObj.amount = item.amount
          this.tranByUser.push(this.transObj);
        })
      })
    })
  }



  totalamount: any;
  getTotalTransactionByUser() {
    this.usernamee = sessionStorage.getItem('username');
    this.interactionServ.getTotalTransactionByUser(this.usernamee).subscribe(r => {
      if (r.result == null) {

        this.totalamount = 0;

      }
      else {
        this.totalamount = r.result;
        console.log(this.totalamount);
      }


    })
  }

  
  dayclose() {
    
    let name = sessionStorage.getItem('username').toLowerCase();
    this.interactionServ.dayClose(name).subscribe(d => {
        console.log(d);
        let url = window.URL.createObjectURL(d);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = "Today Closing Report";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    })


  }

  date: any;
  time: any;
  getLoginTime() {
    let name = sessionStorage.getItem('username').toLowerCase();
    this.interactionServ.getLoginTime(name).subscribe(d => {

      this.date = d.result[0].date;
      this.time = d.result[0].time;

    })


  }
  amountReceived = 0;
  returnedAmount = 0;
  totalAmount = 0;
  invalidAmount = false

  



  discountedAmount = this.total;
  discountInRs = 0;
  showError = false;
  onDiscountChange() {
    this.discountedAmount = this.total;
    if(this.discountInRs > this.total || this.discountInRs < 0)
      this.showError = true;
    else{
      this.discountedAmount = this.total - this.discountInRs;
      this.showError = false;
    }
  }

  backupTotalAmount;
  invalidDiscountAmount = false
  changeDiscount() {
    this.invalidDiscountAmount = false;
    this.backupTotalAmount = this.total;
    // this.total = this.total - this.discount;
    this.returnedAmount = this.amountReceived - this.total + this.discount;
    if (this.discount > this.backupTotalAmount) {
      this.invalidDiscountAmount = true
    }

    if ((this.amountReceived+this.discount == this.total)) {this.invalidAmount= false;}
    else this.invalidAmount= true;
  }
  fafaicon() {

    this.usernamee = sessionStorage.getItem('username').toUpperCase();
    this.usernamee = "<div class='row'> <i class='fa fa-user user'></i><h6>" + this.usernamee + "</h6></div>";

  }
isDisabled(){
  return !this.invalidAmount
  // (this.checkoutProductsArray.length==0 || (this.invalidAmount||this.invalidDiscountAmount))
}

}


