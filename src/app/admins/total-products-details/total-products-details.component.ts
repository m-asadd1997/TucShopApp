import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-products-details',
  templateUrl: './total-products-details.component.html',
  styleUrls: ['./total-products-details.component.css']
})
export class TotalProductsDetailsComponent implements OnInit {

  constructor(private adminService: AdminServiceService, private router: Router) { }

  ngOnInit() {
    this.getProductsDetails();
  }

  Products = []
  getProductsDetails() {

    this.adminService.getTotalProductQuantityDetails().subscribe(d => {
     
     if(this.startValue&&this.endValue&&d){
       this.Products=[];
      d.result=d.result.filter(e=>(  new Date(e.date1) >=this.startValue  &&  new Date(e.date1)<=this.endValue  ));
      


     }
     
      this.Products = d.result;



    })

  }

  backToDashboard() {
    this.router.navigate(['/admin/layout/dashboard'])
  }















  // 


  startValue: Date = null;
  endValue: Date = null;
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




  month
  onStartChange(date: Date): void {

    this.startValue = date





  }

  onEndChange(date: Date): void {
    this.endValue = date;

    this.getProductsDetails();




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


  // 
}
