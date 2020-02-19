import { Component, OnInit } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { AdminServiceService } from '../admin-service.service';





@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private adminService:AdminServiceService) { }

  data :IChartistData= {
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
  }








  reqProducts=[]
  totalProducts


  

  getRequestedProducts(){
    this.adminService.getRequestedProducts().subscribe(d=>{
      this.reqProducts=d;
    })
  };

  getTotalProductQuantity(){
    this.adminService.getTotalProductQuantity().subscribe(d=>{
      this.totalProducts=d.quantity ;
    })
  }






















}
