import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  categories = []
  filteredProducts = []
  constructor(private service: AdminServiceService, private router:Router) { }

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
      console.log('++++++++++',d,'================')
      d.forEach(element => {
        console.log('==============',element,'======================')
        if (element.category.name == data.name) {
          this.filteredProducts.push(element);
        }
      }
   
      );
      console.log(this.filteredProducts,'+++++++++++++++++++++++++++==')
      this.filteredProducts.forEach(d => {
       this.service.deleteProduct(d.id).subscribe();
      })

       this.service.deleteCategory(data.id).subscribe();
     this.categories = this.categories.filter(d => d.id !== data.id);
    })
  }

  updateCategory(id){
    this.router.navigate(['/admin/layout/add-category',id])

  }
}
