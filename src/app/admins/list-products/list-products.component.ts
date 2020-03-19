import { AdminServiceService } from './../admin-service.service';
import { MainscreenService } from './../../main-screen/mainscreen.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(private service:AdminServiceService, private router:Router) { }

  
  Products = []
  allProducts=[];
  

  ngOnInit() {
   
     this.showProducts();
 }
  showProducts() {

    this.service.getProducts().subscribe(item => {

    this.Products = item
    this.allProducts=this.Products;
    
    })
  }
  deleteProduct(data){
   this.service.deleteProduct(data.id).subscribe();
   this.Products = this.Products.filter(d => d.id !== data.id);

  }
  updateProduct(id){
    this.router.navigate(['/admin/layout/add-product',id])

  }

  

}
