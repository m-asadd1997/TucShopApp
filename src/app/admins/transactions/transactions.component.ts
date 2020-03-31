import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
import { Router } from '@angular/router';
import { transactions } from './transactions';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

// import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

constructor(private service:AdminServiceService,private router:Router,private exportAsService: ExportAsService) { }

transactionobj:transactions=new transactions();
  Transactions = [];
  checkdate:string;
  display:boolean=false;
  date:Date=new Date();
  allTransactions = [];
  startValue: Date | null = null;
  endValue: Date | null = null;
  startDate
  endDate;
  
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
    this.startDate=this.changedatetostring(this.startValue)
  }

  onEndChange(date: Date): void {
    
    this.endValue = date;
    this.endDate=this.changedatetostring(this.endValue)
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
datee1;
  ngOnInit() {
    console.log(this.date);
   this.checkdate= this.changedatetostring(this.date);
   console.log(this.checkdate);
   this.datee1= new Date();
   this.startDate="01-"+this.datee1.getFullYear()+"-"+ (this.datee1.getMonth()+1)
   this.endDate="31-"+this.datee1.getFullYear()+"-"+(this.datee1.getMonth()+1);    
   this.showTransactions();
    
  }

  showTransactions(){
    this.service.getTransaction().subscribe(d=>{
      console.log(d);
     
        this.Transactions = d;
            this.allTransactions = this.Transactions;
            this.startDate=this.Transactions[0].date
            this.endDate=this.Transactions[this.Transactions.length-1].date

            console.log(d);
      
      },error=>{
        this.display=true;
      }

      )

    
  }
  deleteTransactions(data){
    console.log("huadu",data);
    this.service.deleteTransactions(data.id).subscribe();
    this.Transactions = this.Transactions.filter(d => d.id !== data.id);
  }
  detailsTransactions(user:String){
    this.router.navigate(['admin/layout/userlist/'+user]);



  //   this.service.getTransaction().subscribe(
  //     b=> {
  //       this.Transactions = b;
  //       console.log(b);
  //     }
  //   )
  // }

  // show(v){
  //   console.log(v);
  }

  scearchTransactions(){

    if(this.startValue==null|| this.endValue==null){
      this.transactionobj.dateFrom=this.changedatetostring(new Date());
      this.transactionobj.dateTill=this.changedatetostring(new Date());
    }
    else{

    this.transactionobj.dateFrom=this.changedatetostring(this.startValue);
    
    this.transactionobj.dateTill=this.changedatetostring(this.endValue);
    console.log(this.transactionobj);
  
    }
    this.service.scearchAllTransaction(this.transactionobj).subscribe(data=>{
    console.log(data);
  
    this.Transactions=data;

    

    },error=>{
      this.display=true;
    }
  )



    
    

  }

  changedatetostring(date:Date){

    let converteddate=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getUTCDate();
    return converteddate;



  }

  




//Export Work


exportAsConfig: ExportAsConfig = {
  type: 'xlsx', // the type you want to download
  elementId: 'table1', // the id of html/table element
}

download()
    {
      this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
        // save started
      });
      // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
      this.exportAsService.get(this.exportAsConfig).subscribe(content => {
        console.log(content);
      });
     
      
    }


}
