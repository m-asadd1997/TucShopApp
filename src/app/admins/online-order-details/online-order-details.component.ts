import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-online-order-details',
  templateUrl: './online-order-details.component.html',
  styleUrls: ['./online-order-details.component.css']
})
export class OnlineOrderDetailsComponent implements OnInit {

  id:any
  onlineOrderDetails:any[]=[];


  constructor(private adminService:AdminServiceService, private toastr: ToastrService, private router:Router,private message:NzMessageService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activateRoute.queryParams.subscribe(d=>{
      this.id=d.id
      this.getonlineOrderDetailsById(this.id);

    });
  }


  getonlineOrderDetailsById(id){
  this.adminService.getOnlineOrderDetailsById(id).subscribe(d=>{
   this.onlineOrderDetails=[...this.onlineOrderDetails,d.result];
  });


  }




}
