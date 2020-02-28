import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transactions-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transactions-details.component.css']
})
export class TransactionsDetailsComponent implements OnInit {

  constructor(private adminService:AdminServiceService,private router:Router) { }

  ngOnInit() {
    this.getTransactionDetails();
  }
  transactionDetails=[]

  getTransactionDetails(){

this.adminService.getTotalTransactionDetails().subscribe(d=>{
  console.log(d.result)
  this.transactionDetails=d.result;
})
  }




  backToDashboard(){
    this.router.navigate(['/admin/layout/dashboard'])
  }

}
