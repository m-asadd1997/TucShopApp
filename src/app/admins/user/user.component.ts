import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
import { ActivatedRoute } from '@angular/router';
import { transactions } from '../transactions/transactions';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  display: boolean;
  constructor(private service:AdminServiceService,private activatedroute:ActivatedRoute,private exportAsService: ExportAsService) { }

  productDetails:any[]=[];
  datevariable:any[]=[];
  transactionOBJ:transactions=new transactions();
  isVisible:boolean=false;
  user:any;
  showproductName:any;
  productimage:String;
  size
  productname:any[]=[];
  allTransactions = [];
  userTransactions = [];
  startValue: Date | null = null;
  endValue: Date | null = null;
  endOpen = false;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {

    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }
  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }

  ngOnInit() {
    this.user=this.activatedroute.snapshot.params['user'];
    console.log(this.user);

    this.showTransactions();
  }
  showTransactions(){
    // this.service.getTransaction().subscribe(item => {
    //   console.log(item);
    //   this.allTransactions = item;
    //   this.userTransactions=this.allTransactions;
    // })
    this.service.getTransactionsByUser(this.user).subscribe(data=>{

console.log("response",data)
// console.log(data.productTransactions.product['name']);
// data.map(d=>{
//         d.productTransactions.map(f=>{
//  this.productname.push({date:d.date,amount:d.amount,createdBy:d.createdBy,updatedBy:d.updatedBy,product:f.product.name,image:f.product.image,price:f.product.price,quantity:f.quantity})
//         })
//       })
//       console.log("my obj",this.productname);
    this.allTransactions=data;
      // console.log(this.productname);
      // console.log(data);
      // this.allTransactions=data;
      // this.allTransactions=data;

    },error=>{
      this.display=true;
    })




  }
  detailsTransactions(data){

    // this.showproductName=products
    // this.productimage=image;
    this.productDetails=data;
    this.isVisible=true;





  }
  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementId: 'table1', // the id of html/table element
  }


  handleCancel(){
    this.isVisible=false;
  }
  handleOk(){
    this.isVisible=false;
  }
  backupTransaction

  scearchUsertransactions(){
    if(this.datevariable[0]==null|| this.datevariable[1]==null){
      this.transactionOBJ.dateFrom=this.changedatetostring(new Date());
      this.transactionOBJ.dateTill=this.changedatetostring(new Date());
    }
    else{

    this.transactionOBJ.dateFrom=this.changedatetostring(this.datevariable[0]);

    this.transactionOBJ.dateTill=this.changedatetostring(this.datevariable[1]);
    this.transactionOBJ.user=this.user;
    console.log(this.transactionOBJ);

    }
    this.service.scearchtransactionofUser(this.transactionOBJ).subscribe(data=>{
      console.log(data);
      this.backupTransaction=data;

      this.allTransactions=data;

    })



  }
  changedatetostring(date:Date){

    let converteddate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getUTCDate();
    return converteddate;



  }
  download()
    {
      // this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
      //   // save started
      // });
      // // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
      // this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      //   console.log(content);
      // });

          // this.service.downloadAllTransactionPDF().subscribe(d => {
          //   console.log("Blob", d);
          //   let url = window.URL.createObjectURL(d);
          //   let a = document.createElement('a');
          //   document.body.appendChild(a);
          //   a.setAttribute('style', 'display: none');
          //   a.href = url;
          //   a.download = new Date().toDateString();
          //   a.click();
          //   window.URL.revokeObjectURL(url);
          //   a.remove();
          // })
      
      
        }

    onChange(){

      if(this.datevariable.length==0){

        this.allTransactions = this.backupTransaction;
        console.log(this.allTransactions);

      }
    }

}
