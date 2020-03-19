import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

// import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

constructor(private service:AdminServiceService,private exportAsService: ExportAsService) { }

  Transactions = [];
  allTransactions = [];
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
    this.showTransactions();
    
  }

  showTransactions(){
    this.service.getTransaction().subscribe(d=>{
      console.log(d);
            this.Transactions = d
            this.allTransactions = this.Transactions
      }
      )

    // this.service.getTransactions().subscribe(item => {
    //   console.log(item);
    //   this.Transactions = item;
    //   this.allTransactions=this.Transactions;
    // })
  }
  deleteTransactions(data){
    console.log("huadu",data);
    this.service.deleteTransactions(data.id).subscribe();
    this.Transactions = this.Transactions.filter(d => d.id !== data.id);
  }
  detailsTransactions(id){
    this.service.getTransaction().subscribe(
      b=> {
        this.Transactions = b;
        console.log(b);
      }
    )
  }

  show(v){
    console.log(v);
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
