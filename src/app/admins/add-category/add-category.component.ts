import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';
import { add_category } from './add_category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  add_categories:add_category= new add_category();
  constructor(private service:AdminServiceService) { }

  ngOnInit() {
  }
  submit(category,icon){
    console.log(category)
    if(category.value&&icon.value)
    {
      // console.log("Hello")
    this.service.postProduct("http://localhost:3004/categories",this.add_categories).subscribe();
  }
  }
}
