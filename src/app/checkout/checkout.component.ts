import { Component, OnInit, ViewEncapsulation,ViewChild, Input, HostListener, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges } from "@angular/core";
import { MainscreenService } from "../main-screen/mainscreen.service";
import { NzModalService, ButtonConfig, NzButtonComponent, NzDrawerPlacement } from "ng-zorro-antd";
import { Checkout } from './Checkout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from '@angular/compiler/src/util';
import { debug } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { count } from 'console';
import { ToastrService } from 'ngx-toastr';
import { LoaderUtilService } from '../util-services/loader-util.service';
import { environment } from 'src/environments/environment';

declare const scanCode :any;


@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {

  url=environment.baseUrl
  productComingOnBasisOfBarcode;
  checkoutProductsArray = [];

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

  @HostListener('document:scan',['$event'])
  onScanBarCodeDevice(event){
    if(sessionStorage.getItem("role").toUpperCase() == "USER"){
      this.barcodeValue = event['detail'].scanCode;
      this.interactionServ.getProductByBarCode(this.barcodeValue)
        .subscribe((res) => {
          if (res.result != undefined && res.status == 200) {

              this.addingProductIntoCart(res.result);
          }
          else {
            this.toastr.warning(res.message);
          }
        },error=>{

          this.toastr.error("Error...............")
        });

    }
  }

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
  extraTemplate
  options: Array<{ name: string; countName: number; count }> = [];
  checkOutObj: Checkout = new Checkout();
  checking: boolean = false;
  status: boolean = false;
  costPrice;


  cols: { header: string; }[];
  requestProduct: any;
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


  barcodeValue;
  constructor(
    private interactionServ: MainscreenService,
    private message: NzMessageService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modal: NzModalService,
    private toastr: ToastrService,
    private loaderService:LoaderUtilService

  ) {

           // this.barCodeScanner();
  }

  private barCodeScanner() {

    document.addEventListener("scan", function (event) {
      //do something





    }.bind(this), false);
  }

  ngOnInit() {

    // this.barCodeScanner();
    this.getLoginTime();
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


    });

    this.populateCols();
    this.costPrice = 0;

    this.interactionServ.productMessage$.subscribe(d => {

      this.addingProductIntoCart(d);

    })



    this.getTransactionObject()

    this.setParkObjectToCheckout();
  }


  setParkObjectToCheckout() {

    this.interactionServ.parkTransactionObject$.subscribe((d: any) => {
      console.log("ABCDEFG"+d);
      this.transactionId = d.id
      this.checkoutProductsArray = [];
      this.total = 0;
      console.log(d);
      this.transactionObjectFromEdit = d;
      d = d.productTransactions.map(item => {

        console.log("ITEMSSSS",item)
        let printproductPrice = item.product['printProductPrice']*item['quantity']
        this.checkoutProductsArray.push({
          id: item.product["id"],
          productTitle: item.product["productTitle"],
          productPrice: printproductPrice,
          productImage: item.product["productImage"],
          productQuantity: item["quantity"],
          productqty: item.product['productqty'],
          printProductPrice: item.product["printProductPrice"],
          productVariant: item.product["productVariant"],


        });
        console.log("Checout Product",this.checkoutProductsArray);

        this.total += item.product["productPrice"]
      })
    })
  }


  transactionObjectFromEdit
  transactionId;
  getTransactionObject() {


    this.interactionServ.transactionObject$.subscribe((d: any) => {
      this.transactionId = d.id
      this.checkoutProductsArray = [];
      this.total = 0;
      console.log(d);
      this.transactionObjectFromEdit = d;
      d = d.productTransactions.map(item => {
        this.checkoutProductsArray.push({
          id: item.product["id"],
          productTitle: item.product["name"],
          productPrice: item.product["price"] * item["quantity"],
          productImage: item.product["image"],
          productQuantity: item["quantity"],
          productqty: item.product['qty'],
          printProductPrice: item.product["price"],
          productVariant: item.product["variants"],


        });
        this.total += item.product["price"]*item["quantity"]
      })
    })
  }

  private addingProductIntoCart(d: Object) {
    if (d) {
      this.costPrice += d['costprice'];
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
        }
        );
      }
      this.total += d["price"];
    };
  }

  ngAfterViewInit(): void {
      scanCode();
   }

  // scanBarCode(){
  //  let code = scanCode();
  //  }

  removeProductFromCheckout(data) {
    let obj1 = {
      "quantity": 0
      , "count": data.productQuantity
    }

    console.log("eibad",obj1.count);
    console.log("===========================", data)
    this.interactionServ.updateMinusAllQuantity(data.id, obj1).subscribe(d => {
      if (d) {
        this.costPrice = this.costPrice - d.result.costprice*data.productQuantity;
        data.productqty = d.result.qty
        let index = this.checkoutProductsArray.findIndex(p => p.id == data.id);
        console.log( this.checkoutProductsArray[index])
        this.total = this.total - this.checkoutProductsArray[index].productPrice;

        this.checkoutProductsArray.splice(index, 1);

      }
    })

  }
  showModal(): void {
    this.totalAmount = 0;
    this.discountInRs = 0;
    this.discountedAmount = this.total;
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
        "quantity": prod.productQuantity,
      }
      this.objToPushForTransaction.push(obj)
    });

    let request = {
      "amount": this.total,
      "requestedUser": reqUser,
      "action": action,
      "productTransactions": this.objToPushForTransaction,
      "discount": this.discountInRs,
      "waiterName": this.waiterName,
      "tableNumber": this.tableNumber,
      "costprice": this.costPrice,
      "phoneNumber": this.phoneNumber

    }

    console.log(request)

    if(!this.transactionId)
    {
    this.interactionServ.saveTransaction(request).subscribe(

      data => {
      console.log(data);
        this.getRecentTransactionByUser();
        // this.getTotalTransactionByUser();
        this.fafaicon();
        this.getLoginTime();
        debugger;
        document.getElementById("print-slip-btn").click();
        // this.checkoutProductsArray = [];
        // this.total = 0;
        if (action === "SC") {
          this.checkoutProductsArray = []; 
          this.total=0; 
          this.toastr.success("Transaction Successfully Saved!");
        }
      },(err)=>{
        this.toastr.error("Session Expired You need to Login Again");
        setTimeout(() => {
          sessionStorage.clear()
          this.router.navigate(['']);

        }, 1000);
      }


    )
    }
    else{
      console.log("Update");

      this.interactionServ.updateTransaction(this.transactionId,request).subscribe(d=>{
        this.transactionId=null;
        this.toastr.success("Transaction Successfully Updated!");
        document.getElementById("print-slip-btn").click();
        this.checkoutProductsArray = [];
        this.total = 0;
      });
    }


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
        console.log("=============================")
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
            this.costPrice += d.result.costprice;
              obj.productqty = d.result.qty;
          })

          let productPrice = obj.printProductPrice
          this.total = this.total + productPrice;
          this.checkoutProductsArray[index].productPrice += productPrice;

          this.checkoutProductsArray[index]["productQuantity"] += 1;
          console.log("this.checkoutProductsArray",this.checkoutProductsArray);

        }
      }

    })

    console.log(this.userName);
  }

  checkingMinusCall = false;
  removeProduct(obj) {
    console.log(obj)
    let obj1 = {
      "quantity": 0
      , "count": obj.productQuantity
    }

    this.interactionServ.updateMinusQuantity(obj["id"], obj1).subscribe(d => {

      if (d) {
        this.costPrice = this.costPrice - d.result.costprice;
        console.log(this.costPrice, "minus cost price");
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


  settingHeader
  saveData(reqUser, action): void {
    debugger;
    if (!this.invalidAmount) {
      // document.getElementById("print-slip-btn").click();
      this.saveTransaction(reqUser, action);
     
      this.costPrice = 0;
      this.amountReceived = 0;
      this.returnedAmount = 0;
      this.phoneNumber=null;
      this.handleCancel();
    }
    else this.message.error("Checkout Failed")
  }

  populateCols() {
    this.cols = [
      { header: "Name" },
      { header: "Price" },
      { header: "Qty" },
      { header: "Amount" },

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
  user = []
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

  visible = false;
  placement: NzDrawerPlacement = 'right';
  open(): void {
    // this.getTotalTransactionByUser();
    this.getRecentTransactionByUser();
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
    this.totalamount=0
    this.usernamee = sessionStorage.getItem('username');
    this.interactionServ.getRecentTransactionByUser(this.usernamee).subscribe(r => {
      console.log("ResponsRecent", r)
      this.totalTrans = r.length;

      r.map(item => {
        this.totalamount+=( item.amount-item.discount)
        item.productTransactions.map(opt => {

          this.transObj = opt;
          this.transObj.amount = item.amount
          this.tranByUser.push(this.transObj);
        })
      })
    })
  }



  totalamount: any;


  dayclose() {
    this.loaderService.showLoader();
    let name = sessionStorage.getItem('username').toLowerCase();
    this.interactionServ.dayClose(name).subscribe(d => {
      this.loaderService.hideLoader();
      console.log("Blob", d);
      let url = window.URL.createObjectURL(d);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = new Date().toDateString();
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
       let dateString = d.result[0].date+" "+d.result[0].time+" GMT+0500";
       let lastLoginDateTime = new Date(dateString)

       this.date = lastLoginDateTime.toDateString();
       this.time =   lastLoginDateTime.toLocaleTimeString();

    })
  }

  amountReceived = 0;
  returnedAmount = 0;
  totalAmount = 0;
  invalidAmount = false;
  waiterName;
  tableNumber;
  phoneNumber;
  discountedAmount = this.total;
  discountInRs = 0;
  showError = false;
  onDiscountChange() {
    this.discountedAmount = this.total;
    if (this.discountInRs > this.total || this.discountInRs < 0)
      this.showError = true;
    else {
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

    if ((this.amountReceived + this.discount == this.total)) { this.invalidAmount = false; }
    else this.invalidAmount = true;
  }
  fafaicon() {

    this.usernamee = sessionStorage.getItem('username').toUpperCase();
    this.usernamee = "<div class='row'> <i class='fa fa-user user'></i><h6>" + this.usernamee + "</h6></div>";

  }
  isDisabled() {
    return !this.invalidAmount
    // (this.checkoutProductsArray.length==0 || (this.invalidAmount||this.invalidDiscountAmount))
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to generate reports?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => this.dayclose()
    });
  }


  addToPark(reqUser, action){

    this.objToPushForTransaction = []
    console.log(this.checkoutProductsArray);

    this.checkoutProductsArray.forEach(prod => {
      let obj = {
        "product": prod,
        "quantity": prod.productQuantity,
      }
      this.objToPushForTransaction.push(obj)
    });
    let request = {
      "amount": this.total,
      "requestedUser": reqUser,
      "action": action,
      "productTransactions": this.objToPushForTransaction,
      "discount": this.discountInRs,
      "waiterName": this.waiterName,
      "tableNumber": this.tableNumber,
      "costprice": this.costPrice

    }
    localStorage.setItem('parkOrder'+new Date(),JSON.stringify(request))
    this.checkoutProductsArray=[];
    this.total=0;
  }
}


