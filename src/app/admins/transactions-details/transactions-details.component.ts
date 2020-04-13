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

  constructor(private adminService: AdminServiceService, private router: Router, private message: NzMessageService) { }

  ngOnInit() {
    this.getTransactionDetails();
  }
  transactionDetails = []
  backupTransactions = []
  getTransactionDetails() {

    this.adminService.getTotalTransactionDetails().subscribe(d => {
      console.log(d.result)


      this.transactionDetails = d.result;
      this.backupTransactions = d.result;
    })
  }




  backToDashboard() {
    this.router.navigate(['/admin/layout/dashboard'])
  }







  startValue = null;
  endValue = null;
  dateRange = []
  print() {

    if (this.dateRange.length > 0) {
      this.startValue = this.dateRange[0];
      this.endValue = this.dateRange[1];
      this.getProductsDetails(this.startValue, this.endValue);



      console.log(this.dateRange);
    }
    else {
      this.message.warning("Please Select A range first");
    }
  }


  getProductsDetails(startValue, endValue) {
    if (startValue && endValue) {
      startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
      endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
    }

    this.adminService.getFilteredDetailedTransactionMethod(startValue, endValue).subscribe(d => {


      this.transactionDetails = d.result;




      

    })









  }

  
  onChange(date:Date){
    if(this.dateRange.length==0){
      this.transactionDetails=this.backupTransactions;
    }
  }
}
