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

showChart=false;


  type: ChartType = 'Bar';

  data = {
    // labels: ["J", "F", "M"],
    // series: [[1, 2, 3]]
    labels: [], series: []


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
  chart
  ngOnInit() {
    this.getRequestedProducts();
    this.getTotalProductQuantity();
    this.getTotalOutOfStockProducts();
    this.getTotalTransaction();
    this.getOutOfStockDetailed();
    this.getChartData();
    this.settingChart();


  }
  settingChart() {
    this.chart = document.getElementById('chartist')
    // console.log(typeof(this.chart));
    console.log(this.chart)
  }







  reqProducts = []
  finalReqProducts = []
  totalProducts
  totalOutOfStockProducts
  chartResult



  getChartData() {

    this.adminService.getChartData().subscribe(d => {
      this.chartResult = d.result;
      this.data.labels = this.chartResult.labels;
      this.data.series.push(this.chartResult.series)
      this.showChart=true;


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
      console.log(d.result)
      if (this.reqProducts.length > 5) {
        this.reqProducts.length = 5;
      }

      else if (this.reqProducts.length < 5) {
        let count = this.reqProducts.length;
        for (let index = count; index < 5; index++) {
          this.reqProducts[index] = { id: 0, name: "", countName: "" };

        }
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
      console.log(d)
      this.totalTransaction = d.result;



    })

    console.log(this.totalTransaction)
    if (this.totalTransaction === undefined) {
      this.totalTransaction = 0;
    }
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
