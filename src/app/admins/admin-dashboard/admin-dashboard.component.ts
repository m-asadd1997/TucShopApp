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
  constructor(private adminService: AdminServiceService, private router: Router) { }




  type: ChartType = 'Bar';

  data = {
    // labels: ["J", "F", "M"],
    // series: [[1, 2, 3]]
labels:[],series:[]


  };



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
    this.getOutOfStockDetailed();
    this.getChartData();
  }








  reqProducts = []
  finalReqProducts = []
  totalProducts
  totalOutOfStockProducts
  chartResult



  getChartData() {

    this.adminService.getChartData().subscribe(d => {
      this.chartResult = d.result;
      this.data.labels=this.chartResult.labels;
      this.data.series.push(this.chartResult.series)
      console.log(this.chartResult);
      console.log(this.data.series)
      console.log(this.data.labels)
     
    })
  }



  getTotalOutOfStockProducts() {
    this.adminService.getTotalOutOfStock().subscribe(d => {
      this.totalOutOfStockProducts = d.result;
    })
  }

  getRequestedProducts() {

    this.adminService.getRequestedProducts().subscribe(d => {
      // this.reqProducts = d;

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
      console.log(this.totalProducts);
    })
  }



  totalTransaction;
  getTotalTransaction() {
    this.adminService.getTotalTransaction().subscribe(d => {
      this.totalTransaction = d.result;

    })
  }



  detailedOutOfStockProducts = [];
  getOutOfStockDetailed() {
    this.adminService.getOutofStockDetails().subscribe(d => {
      this.detailedOutOfStockProducts = d.result;
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
