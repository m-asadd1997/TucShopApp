import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-online-details',
  templateUrl: './online-details.component.html',
  styleUrls: ['./online-details.component.css']
})
export class OnlineDetailsComponent implements OnInit {
  
  onlineDetails:any[]=[];
  orderStatus:String;
  value=1;
  pageValue;
  statusColor;
  trackid;
  phoneno;

  constructor(private adminService:AdminServiceService, private toastr: ToastrService, private router:Router,private message:NzMessageService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getOnlineDetails();
    this.generatingSerialNumber(this.value);

  }

  getOnlineDetails(){
     this.adminService.getOnlineDetails().subscribe(d=>{
      this.onlineDetails = d.result;
      });
     } 
    //   d.result.map(d=>{
    //     this.onlineDetails.push({
    //       firstName: d.firstName,
    //       lastName: d.lastName,
    //       address: d.address,
    //       phone: d.phone,
    //       orderStatus: d.orderStatus,
    //       statusColor: this.changeColors( d.orderStatus)
    //     })
    //   })
    //   console.log(this.onlineDetails)
    // });
     

  changeColors(status){
    switch(status)
    {
      case 'Approve':
        return '#87d068'

       case 'Dispatch':
        return '#f50'
        
        case 'Delivered':
          return '#2db7f5'
        
        case 'Complete':
          return '#108ee9'
        
        case 'New':
          return '#87d068'
           
        default:
          return 'yellow'
      }
  }

  onlineOrderDetail(id){    
    this.router.navigate(['/admin/layout/online-order-details'],{queryParams:{"id":id}})
  }

  changeOnlineOrderStatus(data,status){
   let orderDetailsObj = {
   orderStatus : status
  }
  if(orderDetailsObj.orderStatus != data.orderStatus) {
  this.adminService.changeOnlineOrderStatus(data.id, orderDetailsObj).subscribe(d=>{  
  if(d.status==200){
  this.toastr.success(d.message);
  this.getOnlineDetails(); 
  }
  else{
  this.toastr.error(d.message);
  }
  });  
  }else{
  this.toastr.error("Order Status Already Selected");
  }
  }

  
  onChange(value) {
  if(value!=null && value!="" ){  
  this.adminService.getOrderStatusOnSelect(value).subscribe(d=>{
  if(d.status==200){
  this.onlineDetails=[];  
  this.onlineDetails = d.result; 
  }
  else{
  this.toastr.error(d.message);
  }  
  });
  }else{
  this.getOnlineDetails();
  }
  }

  generatingSerialNumber(value){
  this.pageValue = value    
  }
  
  trackingIdSearchBox(){
  if(this.trackid!=null && this.trackid!=""){
  this.adminService.getTrackingId(this.trackid).subscribe(d=>{
  if(d.status==200){
  this.onlineDetails=[];  
  this.onlineDetails = [...this.onlineDetails,d.result]; 
  }
  else{
  this.toastr.error(d.message);
  }
  });  
  }else{
  this.toastr.error("Please Input Tracking ID To Search Order")  
  this.getOnlineDetails();  
  }
  }

  phoneNoSearchBox(){
  if(this.phoneno!=null && this.phoneno!=""){
  this.adminService.getPhoneNo(this.phoneno).subscribe(d=>{
  if(d.status==200){
  this.onlineDetails=[];
  this.onlineDetails = [...this.onlineDetails,d.result]; 
  } 
  else{
   this.toastr.error(d.message);  
   }
  }); 
  }else{
  this.toastr.error("Please Input Phone Number To Search Order")
  this.getOnlineDetails();  
  }  
  }

  
 
  
}
