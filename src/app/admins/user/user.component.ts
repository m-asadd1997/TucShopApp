import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
import { ActivatedRoute } from '@angular/router';
import { transactions } from '../transactions/transactions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  display: boolean;
  constructor(private service:AdminServiceService,private activatedroute:ActivatedRoute) { }

  transactionOBJ:transactions=new transactions();
  isVisible:boolean=false;
  user:any;
  showproductName:any;
  productimage:String;
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
data.map(d=>{
        d.products.map(f=>{
          
          this.productname.push({date:d.date,amount:d.amount,createdBy:d.createdBy,updatedBy:d.updatedBy,productname:f.name,image:f.image,price:f.price})
        })
      })
      console.log("my obj",this.productname);
    this.allTransactions=this.productname;
      // console.log(this.productname);
      // console.log(data);
      // this.allTransactions=data;
      // this.allTransactions=data;
    
    },error=>{
      this.display=true;
    })


    

  }
  detailsTransactions(products:String,image:String){
    this.isVisible=true;
    this.showproductName=products
    this.productimage=image;



    

  }

  handleCancel(){
    this.isVisible=false;
  }
  handleOk(){
    this.isVisible=false;
  }

  scearchUsertransactions(){
    if(this.startValue==null|| this.endValue==null){
      this.transactionOBJ.dateFrom=this.changedatetostring(new Date());
      this.transactionOBJ.dateTill=this.changedatetostring(new Date());
    }
    else{

    this.transactionOBJ.dateFrom=this.changedatetostring(this.startValue);
    
    this.transactionOBJ.dateTill=this.changedatetostring(this.endValue);
    this.transactionOBJ.user=this.user;
    console.log(this.transactionOBJ);
    
    }
    this.service.scearchtransactionofUser(this.transactionOBJ).subscribe(data=>{
      console.log(data);
      data.map(d=>{
        d.products.map(f=>{
          this.productname.push({date:d.date,amount:d.amount,createdBy:d.createdBy,updatedBy:d.updatedBy,productname:f.name,image:f.image,price:f.price})
        })
      })
      this.allTransactions=this.productname;
      
    })

    

  }
  changedatetostring(date:Date){

    let converteddate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getUTCDate();
    return converteddate;



  }
}
