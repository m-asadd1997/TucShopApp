import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-products-details',
  templateUrl: './total-products-details.component.html',
  styleUrls: ['./total-products-details.component.css']
})
export class TotalProductsDetailsComponent implements OnInit {

  constructor(private adminService:AdminServiceService,private router:Router) { }

  ngOnInit() {
    this.getProductsDetails();
  }

  Products=[]
  getProductsDetails(){
    this.adminService.getTotalProductQuantityDetails().subscribe(d=>{
this.Products=d.result;
    })

  }

  backToDashboard(){
    this.router.navigate(['/admin/layout/dashboard'])
  }

}
