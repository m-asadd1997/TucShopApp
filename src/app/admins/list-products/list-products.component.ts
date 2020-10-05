import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(private service:AdminServiceService, private router:Router,private message: NzMessageService) { }


  Products = []
  index=0;
  allProducts=[];
  disbaleAddQuantity=false;
  checkingForNgOnIt=false;


  ngOnInit() {

     this.showProducts(this.index);

 }
  showProducts(index) {

    this.service.getPaginatedProducts(index).subscribe(item => {
      if(item){

        if(item.content.length==0&&this.checkingForNgOnIt){
          this.message.warning("No More Products");

          this.index--;

        }
        else{
          this.Products = item.content

          this.filteredProducts= item.content;
          this.allProducts=this.Products;
        }

   }

    })
  }
  deleteProduct(data){
   this.service.deleteProduct(data.id).subscribe();
   this.Products = this.Products.filter(d => d.id !== data.id);

  }
  updateProduct(id){
    this.router.navigate(['/admin/layout/add-product',id])

  }

  plusIndexCall(){
    this.checkingForNgOnIt=true;
    this.index+=1;
    this.showProducts(this.index);
  }

  minusIndexCall(){
    this.checkingForNgOnIt=true;

    this.index-=1;
    this.showProducts(this.index);
  }
  value


  filteredProducts=[]
  getProducts(value:any){
    this.service.getSearchedProducts(value).subscribe(d=>{
      this.Products = d;
      console.log(this.filteredProducts)
    })
  }

  onChange(e: Event): void {
   const value = (e.target as HTMLInputElement).value;
   if (value != null && value != "") {
     this.getProducts(value);


   }
   else{
     this.Products=this.filteredProducts;
   }

 }

}
