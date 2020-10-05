import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-total-products-details',
  templateUrl: './total-products-details.component.html',
  styleUrls: ['./total-products-details.component.css']
})
export class TotalProductsDetailsComponent implements OnInit {
  value
  constructor(private adminService: AdminServiceService, private router: Router,private message :NzMessageService) { }

  ngOnInit() {
    // this.getProductsDetails();

    this.adminService.getProducts().subscribe(d=>{
      if(d){
        this.Products=d;
        this.filteredProducts=d;
      }
    })
  }

  Products = []
  backupProducts=[]
  getProductsDetails(startValue,endValue) {
    if (startValue && endValue) {
      startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
      endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
    }

    this.adminService.getTotalProductQuantityDetails(startValue,endValue).subscribe(d => {


     this.Products=d.result;
     this.backupProducts=d.result;





    })

  }

  backToDashboard() {
    this.router.navigate(['/admin/layout/dashboard'])
  }




  startValue: Date = null;
  endValue: Date = null;
  endOpen = false;

dateRange=[]

  print(){
    console.log(this.dateRange);
    if(this.dateRange.length>0){
    this.startValue=this.dateRange[0];
    this.endValue=this.dateRange[1];
    this.getProductsDetails(this.startValue,this.endValue);


    }
  }


filteredProducts=[]
  getVariants(value:any){
    this.adminService.getSearchedProducts(value).subscribe(d=>{
      this.Products = d;
      console.log(this.filteredProducts)
    })
  }

  onChange(e: Event): void {
   const value = (e.target as HTMLInputElement).value;
   if (value != null && value != "") {
     this.getVariants(value);


   }
   else{
     this.Products=this.filteredProducts;
   }

   if(this.dateRange.length==0){
     this.Products= this.backupProducts;
   }

 }




}
