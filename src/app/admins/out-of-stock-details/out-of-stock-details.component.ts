import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-out-of-stock-details',
  templateUrl: './out-of-stock-details.component.html',
  styleUrls: ['./out-of-stock-details.component.css']
})
export class OutOfStockDetailsComponent implements OnInit {

  constructor(private adminService:AdminServiceService, private router:Router,private message:NzMessageService) { }
  detailedOutOfStockProducts=[]
  ngOnInit() {
    this.getOutOfStockDetailed();
  }
  backupProducts=[]
  getOutOfStockDetailed(){
    this.adminService.getOutofStockDetails().subscribe(d=>{
      this.detailedOutOfStockProducts=d.result;
      this.backupProducts=d.result;
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

dateRange=[]
  print(){

    if(this.dateRange.length>0){
    this.startValue=this.dateRange[0];
    this.endValue=this.dateRange[1];
    this.getProductsDetails(this.startValue,this.endValue);



    console.log(this.dateRange);}
    else{
      this.message.warning("Please Select A range first");
    }
  }



  getProductsDetails(startValue,endValue) {
    if (startValue && endValue) {
      startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
      endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
    }

    this.adminService.getFilteredOutOfStock(startValue,endValue).subscribe(d => {
     console.log(d.result);

     this.detailedOutOfStockProducts =d.result;





    })

  }


  onChange(result: Date): void {

    if(this.dateRange.length===0)
   {

     this.detailedOutOfStockProducts=this.backupProducts;
   }
  }

}
