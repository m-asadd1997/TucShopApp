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
        console.log(d);
      if(this.startValue&&this.endValue&&d){
        this.detailedOutOfStockProducts=[];
       d.result=d.result.filter(e=>(  new Date(e.date1) >=this.startValue  &&  new Date(e.date1)<=this.endValue  ));
       
 
 
      }
      this.detailedOutOfStockProducts=d.result;
      console.log(this.detailedOutOfStockProducts);
    })
  }

  backToDashboard(){
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

    this.getOutOfStockDetailed();




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
