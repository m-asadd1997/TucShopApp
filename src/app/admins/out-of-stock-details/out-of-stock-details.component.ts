import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-out-of-stock-details',
  templateUrl: './out-of-stock-details.component.html',
  styleUrls: ['./out-of-stock-details.component.css']
})
export class OutOfStockDetailsComponent implements OnInit {

  constructor(private adminService:AdminServiceService, private router:Router) { }
  detailedOutOfStockProducts=[]
  ngOnInit() {
    this.getOutOfStockDetailed();
  }
  getOutOfStockDetailed(){
    this.adminService.getOutofStockDetails().subscribe(d=>{
      this.detailedOutOfStockProducts=d.result;
      console.log(this.detailedOutOfStockProducts);
    })
  }

  backToDashboard(){
    this.router.navigate(['/admin/layout/dashboard'])
  }

}
