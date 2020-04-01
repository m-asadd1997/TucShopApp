import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  categories = []
  filteredProducts = []


  constructor(private service: AdminServiceService, private router: Router, private nzMessageService: NzMessageService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.service.getCategory().subscribe((d) => {
      this.categories = d;
    })
  }



  deleteCategory(data) {

    this.filteredProducts = []

    this.service.getProducts().subscribe((d) => {
      if(d){
      d.forEach(element => {

        if (element.category.name == data.name) {
          this.filteredProducts.push(element);
        }
      }

      );}
        let i=0;
      this.filteredProducts.forEach(d => {
        if(d){
        i++;
        this.service.deleteProduct(d.id).subscribe();}
      })
      if(i==this.filteredProducts.length){
      this.service.deleteCategory(data.id).subscribe();
      this.categories = this.categories.filter(d => d.id !== data.id);}
    })
  }

  updateCategory(id) {
    this.router.navigate(['/admin/layout/add-category', id])

  }
}
