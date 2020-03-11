import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
// import * as XLSX from 'xlsx'; 
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

constructor(private service:AdminServiceService) { }

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

exportexcel()
    {
     
      //  let element = document.getElementById('table1'); 
      //  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    
      //  const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    
      //  XLSX.writeFile(wb, "Transaction.xlsx");
			
    }


}
