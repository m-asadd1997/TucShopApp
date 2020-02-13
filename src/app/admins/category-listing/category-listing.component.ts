import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.css']
})
export class CategoryListingComponent implements OnInit {

  categories = []
  filteredProducts = []
  constructor(private service: AdminServiceService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.service.getCategory().subscribe((d) => {
      this.categories = d;
      console.log(this.categories)

    })
  }



  deleteCategory(data) {
    this.filteredProducts = []
    // this.service.deleteProductAdmin(data.id).subscribe();
   
   
    // console.log(data);


    this.service.getCategory().subscribe((d) => {
      d.forEach(element => {
        if (element.category == data.name) {
          this.filteredProducts.push(element);
        }
      }

      );
      this.filteredProducts.forEach(d => {
       this.service.deleteCategory(d.id).subscribe();
        console.log(d.id);
      })

       this.service.deleteCategory(data.id).subscribe();
     this.categories = this.categories.filter(d => d.id !== data.id);
    })
  }

}
