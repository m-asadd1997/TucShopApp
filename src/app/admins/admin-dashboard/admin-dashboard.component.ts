import { Component, OnInit } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { NzMessageService } from 'ng-zorro-antd';
// import { element } from 'protractor';






@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isTotalProductsVisibleModal = false;
  isOutOfStockVisibleModal = false;
  isTotalTransactionModalVisible = false;

  dateRange = [];
  profit : any

  constructor(private adminService: AdminServiceService, private router: Router,private message:NzMessageService) { }

  showChart = false;


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
    let date1= new Date();
    let start="1880-3-2";
    let end =date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
    this.getProfit(start,end,true);
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


  array = []
  getChartData() {
    this.showChart = false;

    this.adminService.getChartData().subscribe(d => {
      if (this.startValue && this.endValue) {
        this.chartResult = d.result;
        this.data.labels = this.chartResult.dates;
        this.data.series = [];
        this.data.series.push(this.chartResult.amounts);
        console.log(this.data.series);
        // this.array = this.chartResult.dates
        // this.data.labels.forEach(date => {
        //      
        //   var datee = new Date(date)

        // this.data.labels=  this.data.labels.filter(date=>{ 
        //     this.array.push(this.data.labels.indexOf(date));

        //     (!(datee >= this.startValue && datee < this.endValue))
        //   })

        var length = this.data.labels.length
        let i = 0;
        for (let index = 0; index < length; index++) {

          var datee = new Date(this.data.labels[index]);
          if (!(datee >= this.startValue && datee <= this.endValue)) {
            this.data.labels.splice(i, 1);
            this.data.series[0].splice(i, 1);
            i = 0;

          }
          else {
            i++;
          }

        }

        // });


        this.showChart = true;
      }

      else {
        this.chartResult = d.result;
        this.data.labels = this.chartResult.labels;
        this.data.series.push(this.chartResult.series)
        this.showChart = true;
      }


    })
  }


  totalOutofStockObject = []
  getTotalOutOfStockProducts() {

    this.adminService.getTotalOutOfStock().subscribe(d => {

      this.totalOutofStockObject = d.result;
      this.totalOutOfStockProducts = this.totalOutofStockObject.length;
      if (this.startValue && this.endValue && d) {
        this.totalOutOfStockProducts = []
        this.totalOutofStockObject.forEach(e => {
          let datee = new Date(e[1]);
          if (datee >= this.startValue && datee <= this.endValue) {
            this.totalOutOfStockProducts.push(e);
            // this.totalProducts=this.totalProducts.length

          }
        });
        if (this.totalOutOfStockProducts == undefined) {

          this.totalOutOfStockProducts = 0
        }
        else

          this.totalOutOfStockProducts = this.totalOutOfStockProducts.length;
      }
    })
  }

  abcd: Date;
  getRequestedProducts() {

    this.adminService.getRequestedProducts().subscribe(d => {
      let filteredReqProducts=[];
      this.reqProducts = d.result;
      // this.abcd = new Date(this.reqProducts[0].date1);

      if (d && this.startValue && this.endValue) {
        this.reqProducts.forEach(e => {
          this.abcd = new Date(e.date1);
          if (this.abcd >= this.startValue && this.abcd <= this.endValue) {
            filteredReqProducts.push(e);
          }
        })

        this.reqProducts = filteredReqProducts;
        if (this.reqProducts.length < 5) {
          let count = this.reqProducts.length;
          for (let index = count; index < 5; index++) {
            this.reqProducts[index] = {};

          }
        }

      }



      // console.log(d.result)
      // if (this.reqProducts.length > 5) {
      //   this.reqProducts.length = 5;
      // }

      // else if (this.reqProducts.length < 5) {
      //   let count = this.reqProducts.length;
      //   for (let index = count; index < 5; index++) {
      //     this.reqProducts[index] = {};

      //   }
      // }





    })
  };

  totalProductObject = []
  getTotalProductQuantity() {
    //  
    this.adminService.getTotalProductQuantity().subscribe(d => {

      if (d) {
        this.totalProductObject = d.result;
        this.totalProducts = this.totalProductObject.length
        if (this.startValue && this.endValue) {
          this.totalProducts = [];
          this.totalProductObject.forEach(e => {
            let datee = new Date(e[1]);
            if (datee >= this.startValue && datee < this.endValue) {
              this.totalProducts.push(e);
              // this.totalProducts=this.totalProducts.length

            }
          });

          console.log(this.totalProducts);

          if (this.totalProducts == undefined) {

            this.totalProducts = 0
          }
          else
            this.totalProducts = this.totalProducts.length;
        }

        console.log(this.totalProducts);
      }

    })
  }



  totalTransaction;
  totalAmount;
  totalTransactionFiltering;
  getTotalTransaction() {
    this.totalAmount = 0;
    this.adminService.getTotalTransaction().subscribe(d => {
      if (d) {


        this.totalTransaction = d.result;
        this.totalTransaction.forEach(element => {
          this.totalAmount += element[0];
        });




        if (this.startValue && this.endValue) {
          this.totalAmount =  0;
          this.totalTransaction.forEach(element1 => {
            let datee = new Date(element1[1]);
            if (datee >= this.startValue && datee < this.endValue) {
              this.totalAmount += element1[0];
            }

          });
        }
      }
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










  showModalOutOfStock(): void {
    this.router.navigate(['admin/layout/outOfstockdetail'])
  }





  showModalTotalTransactions(): void {
    this.router.navigate(['admin/layout/transactiondetail'])
  }












print(){

  if(this.dateRange.length>0){
  this.startValue=this.dateRange[0];
  this.endValue=this.dateRange[1];
  this.getRequestedProducts();
    this.getTotalProductQuantity();
    this.getTotalOutOfStockProducts();
    this.getTotalTransaction();
    this.getChartData();
    this.getProfit(this.startValue, this.endValue,false);


  console.log(this.dateRange);}
  else{
    this.message.warning("Please Select A range first");
  }
}








  // Date Picker Work



  startValue: Date=null;
  endValue: Date=null;
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
    this.getRequestedProducts();
    this.getTotalProductQuantity();
    this.getTotalOutOfStockProducts();
    this.getTotalTransaction();
    this.getChartData();
    // this.getProfit(this.startValue, this.endValue)
    
    debugger
    


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

  deleterequestedproduct(productName:string){
    this.adminService.deleterequestedproduct(productName).subscribe(data=>{
      console.log(data);
      if(data.status=="200"){
        this.message.success("Deleted successfully", { nzDuration: 3000 });
      this.getRequestedProducts();
      }
    })
    

  
  }

  getProfit(startValue, endValue, flag){
    if(startValue && endValue&&!flag){
    startValue=startValue.getFullYear()+"-"+ (startValue.getMonth()+1)+"-"+(startValue.getDate())
    endValue=endValue.getFullYear()+"-"+ (endValue.getMonth()+1)+"-"+(endValue.getDate())
    }
    this.adminService.getProfit(startValue, endValue).subscribe(d=>{
    this.profit = d.result[0].profit
   });
}
}