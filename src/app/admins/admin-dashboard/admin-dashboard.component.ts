import { Component, OnInit } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData,
  sum
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
  extraTemplate

  dateRange = [];

  constructor(private adminService: AdminServiceService, private router: Router, private message: NzMessageService) { }

  showChart = false;
  showChartt= false;
  showCharttt= false;
  backupTotalProducts
  backupTotalOutOfStock;
  backupTotalTransaction;
  backupTotalProfit;


  data1 = {
    chart: {
      caption: "Category Based Transaction",
      plottooltext: "<b>$percentValue</b> of transactions are based on $label",
      showlegend: "1",
      showpercentvalues: "1",
      legendposition: "bottom",
      usedataplotcolorforlabels: "1",
      theme: "fusion"
    },
    data: [

    ]
  };
  width = 500;
  height = 400;
  type1 = "pie2d";
  dataFormat = "json";
  dataSource = this.data1;

  data2  = {
    chart: {
      caption: "Transaction Method",
      plottooltext: "<b>$percentValue</b> using $label method",
      showlegend: "1",
      showpercentvalues: "1",
      legendposition: "bottom",
      usedataplotcolorforlabels: "1",
      theme: "fusion"
    },
    data: [

    ]
  };
  width1 = 500;
  height1 = 400;
  type2 = "pie2d";
  dataFormat1 = "json";
  dataSource1 = this.data2;



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
  filtering: Boolean = false;

  ngOnInit() {
    this.getRequestedProducts();
    this.getTotalProductQuantity();
    this.getTotalOutOfStockProducts();
    this.getTotalTransaction();
    this.getOutOfStockDetailed();
    this.getChartData();
    this.settingChart();
    this.getTotalProfit();
    this.getTotalInventory();
    this.getPieChartDataForCategoryBasedTransaction();
    this.getPieChartDataForTransactionMethod();

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
  charttResult


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


        var length = this.data.labels.length
        let i = 0;

        for (let index = 0; index < length; index++) {

          var datee = new Date(this.data.labels[index]);
          if (!(datee.getDate() >= this.startValue.getDate() && datee.getDate() <= this.endValue.getDate())) {
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

  getPieChartDataForCategoryBasedTransaction(){

    this.showChartt  = false;
    this.adminService.getFrequencyByCategory().subscribe(d=>{
    console.log("PieChart",d.result)
    if(d){
      this.data1.data= d.result;
      this.showChartt = true;
    }

  })
  }

  getFilteredPieChartDataForCategoryBasedTransaction(startValue,endValue){
    this.showChartt = false;
    if(startValue && endValue){
      startValue=startValue.getFullYear()+"-"+ (startValue.getMonth()+1)+"-"+(startValue.getDate())
      endValue=endValue.getFullYear()+"-"+ (endValue.getMonth()+1)+"-"+(endValue.getDate())
    }
    this.adminService.getFilteredFrequencyBycategory(startValue,endValue).subscribe(d=>{
      console.log("Filtered",d.result)
      if(d.result===null){
        this.data1.data = [];
      }
      else if(d){
        this.data1.data = d.result;
        console.log(this.data1.data)
      }
      this.showChartt=true;
    })
  }

  getPieChartDataForTransactionMethod(){
    this.showCharttt  = false;
    this.adminService.getTransactionMethod().subscribe(d=>{
      console.log("PieChart2",d.result)
      if(d){
        this.data2.data = d.result;
        this.showCharttt = true;

      }
    })
  }
  getFilteredTransactionMethod(startValue,endValue){
    this.showCharttt = false;
    if(startValue && endValue){
      startValue=startValue.getFullYear()+"-"+ (startValue.getMonth()+1)+"-"+(startValue.getDate())
      endValue=endValue.getFullYear()+"-"+ (endValue.getMonth()+1)+"-"+(endValue.getDate())
    }
    this.adminService.getFilteredTransactionMethod(startValue,endValue).subscribe(d=>{
      console.log("FilteredDATA",d.result);
      if(d.result===null){
        this.data2.data = [];
      }
      else{
        this.data2.data=d.result;
      }
      this.showCharttt=true;
    })
  }


  totalOutofStockObject = []
  getTotalOutOfStockProducts() {

    this.adminService.getTotalOutOfStock().subscribe(d => {


      this.totalOutOfStockProducts=d.result;
      this.backupTotalOutOfStock=d.result;
    })
  }

  abcd: Date;
  getRequestedProducts() {

    this.adminService.getRequestedProducts().subscribe(d => {
      let filteredReqProducts = [];
      this.reqProducts = d.result;

    })
  };


 backupTotalInventory:any
  getTotalInventory(){
    this.adminService.getTotalInventory().subscribe(d=>{
      if(d.result==null){
        this.totalInventory=0;
       } else{
      console.log("Total Inventory",d);
      this.totalInventory=d.result;
      this.backupTotalInventory=d.result;
       }
    });
  }

  totalInventory =0;
  getFilteredTotalInventory(startValue, endValue){
    if(startValue && endValue){
    startValue=startValue.getFullYear()+"-"+ (startValue.getMonth()+1)+"-"+(startValue.getDate())
    endValue=endValue.getFullYear()+"-"+ (endValue.getMonth()+1)+"-"+(endValue.getDate())
  }
    this.adminService.getFilteredTotalInventory(startValue, endValue).subscribe(d=>{
    if(d.result==null){
      this.totalInventory=0;
    }else{
      console.log("********",d.result);
    this.totalInventory = d.result;
    }
  });
}

  totalProductObject = []



  getFilteredProductQuantity(startValue,endValue){
    if (startValue && endValue) {
      startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
      endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
    }

    this.adminService.getFilteredQuantity(startValue,endValue).subscribe(d=>{this.totalProducts=d.result});
  }



  getTotalProductQuantity() {
    //
    this.adminService.getTotalProductQuantity().subscribe(d => {

      if (d) {

        this.totalProducts = d.result;
        this.backupTotalProducts=d.result;
      }
    })

  }



  totalTransaction;
  totalAmount=0;
  totalTransactionFiltering;
  getTotalTransaction() {
    this.totalAmount = 0;
    this.adminService.getTotalTransaction().subscribe(d => {
      if (d&&d.result) {
        this.totalAmount = d.result;

        this.backupTotalTransaction=d.result;


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







    getFilteredOutOfStockProducts(startValue,endValue){

      if (startValue && endValue) {
        startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
        endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
      }
      this.adminService.getFilteredOutOfStock(startValue,endValue).subscribe(d=>{this.totalOutOfStockProducts=d.result.length})
    }


  print() {

    if (this.dateRange.length > 0) {
      this.startValue = this.dateRange[0];
      this.endValue = this.dateRange[1];
      // this.getRequestedProducts();
      this.getFilteredProductQuantity(this.startValue,this.endValue);
      this.getFilteredOutOfStockProducts(this.startValue,this.endValue);
      this.getFilteredTotalTransaction(this.startValue,this.endValue);
      this.getChartData();
      this.getProfit(this.startValue, this.endValue);
      this.getFilteredTotalInventory(this.startValue,this.endValue);
      this.getFilteredPieChartDataForCategoryBasedTransaction(this.startValue,this.endValue);
      this.getFilteredTransactionMethod(this.startValue,this.endValue);



      console.log(this.dateRange);
    }
    else {
      this.message.warning("Please Select A range first");
    }
  }


  getFilteredTotalTransaction(startValue, endValue) {

    if (startValue && endValue) {
      startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
      endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
    }
    this.adminService.getFilteredTransaction(startValue,endValue).subscribe(d=>{
      this.totalAmount=d.result;
    });
  }









  // Date Picker Work



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
    this.getRequestedProducts();
    this.getTotalProductQuantity();
    this.getTotalOutOfStockProducts();
    this.getTotalTransaction();
    this.getChartData();
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

  deleterequestedproduct(data) {
    this.adminService.deleterequestedproduct(data.name).subscribe(data => {
      console.log(data);
      if (data.status == "200") {
        this.message.success("Request Completed Successfully", { nzDuration: 3000 });
        this.getRequestedProducts();
        this.reqProducts = this.reqProducts.filter(f => (data.id != f.id))
      }
    })



  }
  profit = 0;
  getProfit(startValue, endValue) {
    if (startValue && endValue) {
      startValue = startValue.getFullYear() + "-" + (startValue.getMonth() + 1) + "-" + (startValue.getDate())
      endValue = endValue.getFullYear() + "-" + (endValue.getMonth() + 1) + "-" + (endValue.getDate())
    }
    this.adminService.getProfit(startValue, endValue).subscribe(d => {
      if (d.result == null) {
        this.profit = 0;
      } else {
        this.profit = d.result[0].profit
      }
    });


  }



  getTotalProfit() {
    this.adminService.getTotalProfit().subscribe(d => {
      if (d.result == null) {
        this.profit = 0;
      } else {
        this.profit = d.result[0].profit
        this.backupTotalProfit = d.result[0].profit
      }
    });

  }




onChange(){
  if(this.dateRange.length==0){
    this.totalProducts=this.backupTotalProducts;
    this.totalOutOfStockProducts=this.backupTotalOutOfStock;
    this.totalAmount=this.backupTotalTransaction;
    this.profit=this.backupTotalProfit;
    this.totalInventory=this.backupTotalInventory;
  }
}

}









