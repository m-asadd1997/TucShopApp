import { transactions } from './../admins/transactions/transactions';
import { productlisting } from './productlisting';
import { Component, OnInit } from '@angular/core';
import { MainscreenService } from '../main-screen/mainscreen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageComponent } from 'ng-zorro-antd';
import { debug } from 'util';
import { AdminServiceService } from '../admins/admin-service.service';
// import { // } from 'fusioncharts';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  visibility: boolean = false;
  products: any[] = [];
  transactions: any[] = [];
  abc: any;
  isVisible1: boolean = false;
  productsArray = [] = [];
  reacentTransactions = []
  params: any;
  small
  inputValue
  categoryHeader: any;
  count = 0;
  searchProduct: any;
  options: any;

  constructor(private prodService: MainscreenService, private activeRoute: ActivatedRoute, private service: AdminServiceService, private router: Router) { }

  transactionIDObj = new productlisting();

  ngOnInit() {



    this.activeRoute.paramMap.subscribe(
      params => {


        this.getProducts(params['params'].category)
        this.categoryHeader = params['params'].category;

      }
    );
    this.getAllProducts();



  }

  getProducts(str: any) {

    if (str === "products") {
      this.getAllProducts();


    }
    else {

      this.prodService.getProducts(str).subscribe(d => {

        if (d) {
          d.result = d.result.filter(e => (e.qty > 0 || e.infiniteQuantity))
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
        d = d.filter(e => (e.qty > 0 || e.infiniteQuantity))
        this.productsArray = d;
      }


    })
  }


  searchProductByKeyword(value: any) {
    this.router.navigate(["categories/products"]);
    this.prodService.searchProductByKeyword(value).subscribe(d => {
      if (d) {

        this.searchProduct = d.result;
        this.productsArray = this.searchProduct;
        // this.categoryHeader =  category.name

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

  searchOptionClicked(option){
    console.log(option)
    this.categoryHeader = option.category.name;
    this.inputValue = "";
  }

  showModal() {
    console.log("s",this.products);
    this.isVisible1 = true;
    this.prodService.recentTransactions().subscribe(data => {
      console.log("Dattaaa", data);
      this.transactions = data;

      this.reacentTransactions = this.transactions;


    })
  }



  getTransactionOnSearch() {

    if (this.transactionIDObj.transactionID == "" || this.transactionIDObj.transactionID == null) {
      this.transactions = this.reacentTransactions;
    }
    else {
      this.transactions = this.transactions.filter(obj => obj.id == parseInt(this.transactionIDObj.transactionID))
      console.log("Filter", this.transactions)
    }


  }

  search(value) {
    if (value.data == "" || value.data == null || value.data == undefined) {
      this.transactions = this.reacentTransactions;
    }
  }

  showproducts(productTransactions: any[]) {
    this.products = productTransactions;
    this.visibility = true;


  }
  handleCancel1() {
    this.isVisible1 = false;

  }
  handleOk1() {
    this.isVisible1 = false;

  }

  handleCancel() {
    this.visibility = false;

  }
  handleOk() {
    this.visibility = false;



  }
  deleteTransaction(id: any) {
    console.log(id);
    this.prodService.deleteTransaction(id).subscribe(d => {
      console.log(d);
      this.showModal();
    })


  }

  editTransaction(transactionObject) {
    console.log(transactionObject)

    this.prodService.sendTransactionObject(transactionObject);
    this.isVisible1 = false;

  }
  index
  editParkTransaction(transactionObject){
    this.prodService.sendParkTransactionObject(transactionObject);
    this.isParkVisible=false;
    this.index=this.results.indexOf(transactionObject);
    let key = this.keys[this.index];
    localStorage.removeItem(key)
    console.log(this.index)

  }
  isParkVisible=false
  handleParkCancel(){
    this.isParkVisible = false;
  }
  handleParkOk(){
    this.isOkLoading = true;
    setTimeout(() => {
      this.isParkVisible = false;
      this.isOkLoading = false;
    }, 500);
  }
  isOkLoading = false;
  results=[]
  keys=[]
  showParkingModal(){
    //
    this.isParkVisible=true;
   this.results = [];
   this.keys=[]
    for (let i = 0; i < localStorage.length; i++) {
       let key = window.localStorage.key(i);
        if (key.includes("parkOrder")) {
          this. results.push(JSON.parse(localStorage.getItem(key)));
          this.keys.push(key)
        }
    }
    console.log(this.results);

  }
  visibilityProductParkImage
  showParkproducts(productTransactions){
    this.products = productTransactions;
    this.visibilityProductParkImage=true
  }
  handleParkProductCancel(){
    this.visibilityProductParkImage=false
  }

  handleParkProductOk(){
    this.visibilityProductParkImage=false
  }

}
