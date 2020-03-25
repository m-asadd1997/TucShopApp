import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-transactions-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transactions-details.component.css']
})
export class TransactionsDetailsComponent implements OnInit {

  constructor(private adminService:AdminServiceService,private router:Router,private message:NzMessageService) { }

  ngOnInit() {
    this.getTransactionDetails();
  }
  transactionDetails=[]

  getTransactionDetails(){

this.adminService.getTotalTransactionDetails().subscribe(d=>{
  console.log(d.result)

  if(this.startValue&&this.endValue&&d){
    debugger              
    this.transactionDetails=[];
   d.result=d.result.filter(e=>(  new Date(e.date) >=this.startValue  &&  new Date(e.date)<=this.endValue  ));
   


  }
  this.transactionDetails=d.result;
})
  }




  backToDashboard(){
    this.router.navigate(['/admin/layout/dashboard'])
  }








dateRange=[]
  print(){

    if(this.dateRange.length>0){
    this.startValue=this.dateRange[0];
    this.endValue=this.dateRange[1];
    this.getTransactionDetails();

  
  
    console.log(this.dateRange);}
    else{
      this.message.warning("Please Select A range first");
    }
  }



  //


  startValue: Date=null;
  endValue: Date=null;
  endOpen = false;

  // disabledStartDate = (startValue: Date): boolean => {
  //   if (!startValue || !this.endValue) {
  //     return false;
  //   }
  //   return startValue.getTime() > this.endValue.getTime();
  // };

  // disabledEndDate = (endValue: Date): boolean => {
  //   if (!endValue || !this.startValue) {
  //     return false;
  //   }
  //   return endValue.getTime() <= this.startValue.getTime();
  // };




  // month
  // onStartChange(date: Date): void {

  //   this.startValue = date





  // }

  // onEndChange(date: Date): void {
  //   this.endValue = date;
  //  this.getTransactionDetails();
    
    


  // }

  // handleStartOpenChange(open: boolean): void {
  //   if (!open) {
  //     this.endOpen = true;
  //   }
  //   console.log('handleStartOpenChange', open, this.endOpen);
  // }

  // handleEndOpenChange(open: boolean): void {
  //   console.log(open);
  //   this.endOpen = open;
  // }
  // //


}
