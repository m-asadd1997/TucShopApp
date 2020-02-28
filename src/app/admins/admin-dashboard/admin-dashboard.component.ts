import { Component, OnInit } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isTotalProductsVisibleModal = false;
  isOutOfStockVisibleModal = false;
  isTotalTransactionModalVisible = false;
  constructor(private adminService: AdminServiceService,private router:Router) { }

  data: IChartistData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3],
      [3, 2, 9, 5, 4, 6, 4]
    ]
  };



  type: ChartType = 'Bar';


  options: IBarChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };
  ngOnInit() {
    this.getRequestedProducts();
    this.getTotalProductQuantity();
    this.getTotalOutOfStockProducts();
    this.getTotalTransaction();
    this.getOutOfStockDetailed()
  }








  reqProducts = []
  finalReqProducts = []
  totalProducts
  totalOutOfStockProducts




  getTotalOutOfStockProducts() {
    this.adminService.getTotalOutOfStock().subscribe(d => {
      this.totalOutOfStockProducts = d.result;
    })
  }

  getRequestedProducts() {

    this.adminService.getRequestedProducts().subscribe(d => {
      // this.reqProducts = d;

      console.log(d);
      this.reqProducts = d.result;
      if (this.reqProducts.length > 5) {
        this.reqProducts.length = 5;
      }

      



    })
  };

  getTotalProductQuantity() {
    //debugger
    this.adminService.getTotalProductQuantity().subscribe(d => {

      this.totalProducts = d.result;
    })
  }



totalTransaction;
  getTotalTransaction() {
    this.adminService.getTotalTransaction().subscribe(d => {
      this.totalTransaction=d.result;

    })
  }



  detailedOutOfStockProducts=[];
  getOutOfStockDetailed(){
    this.adminService.getOutofStockDetails().subscribe(d=>{
      this.detailedOutOfStockProducts=d.result;
      console.log(this.detailedOutOfStockProducts);
    })
  }












  showModalTotalProducts(): void {
   this.router.navigate(['/admin/layout/totalproddetails'])
  }

  // handleOkTotalProducts(): void {
   
  // }

  // handleCancelTotalProducts(): void {
  //   this.isTotalProductsVisibleModal = false;
  // }








  showModalOutOfStock(): void {
    this.router.navigate(['admin/layout/outOfstockdetail'])
  }

  // handleOkOutOfStock(): void {
  //   this.isOutOfStockVisibleModal = false;
  // }

  // handleCancelOutOfStock(): void {
  //   this.isOutOfStockVisibleModal = false;
  // }




  showModalTotalTransactions(): void {
    this.router.navigate(['admin/layout/transactiondetail'])
  }

  // handleOkTotalTransaction(): void {
  //   this.isTotalTransactionModalVisible = false;
  // }

  // handleCancelTotalTransaction(): void {
  //   this.isTotalTransactionModalVisible = false;
  // }


}
