import { Component, OnInit } from '@angular/core';
import { MainscreenService } from '../main-screen/mainscreen.service';





@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent implements OnInit {

  constructor(private prodService: MainscreenService) { }

  data = [];
  product;
  productsarray:any[]=[];
  isVisible:boolean=false;



  ngOnInit(){
    this.gettingRecentTransactions();
    
      // this.data = d;


    //   console.log(res);
    //   if (res) {
    //     let countArray;
    //     this.data = res.map((value, index) => {
    //       value.countArray = [];
    //       this.data.push(value)
    //       countArray = [];

    //       value.products.map((d) => {
    //         if (!countArray.find((a) => d.name == a.name)) {

    //           let countObj = {
    //             name: d.name,
    //             count: 1
    //           }
    //           countArray.push(countObj);


    //         }
    //         else {

    //           countArray = countArray.map((a) => {
    //             if (a.name == d.name)
    //               a.count++;
    //             return a;
    //           });

    //         }



    //       })


    //       let newData = value;
    //       newData.countArray = countArray;
    //       return newData;
    //     })
    //     // console.log(countArray,"===================");

    //     console.log(this.data, "==============newdata");
    //   }
    // })
    
    

  }
  gettingRecentTransactions(){
    this.prodService.recentTransactions().subscribe(response=>{

      console.log(response);
      this.data=response;
    })
  }

showproducts(productTransaction:any[]){
  
this.productsarray=productTransaction;
this.isVisible=true;
}


  handleOk(){
    this.isVisible=false;
  }
  handleCancel(){
    this.isVisible=false;
  }


checking(){
  if(this.data.length>0&&this.data)
  {
    return true;
  }
  return false;
}


}
