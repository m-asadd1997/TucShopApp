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
  formData = new FormData();
  handleCategoryBanner(file:FileList){
    this.add_categories.icons=file[0];
  }
  ngOnInit() {
  }
  submit(){
    
    
      // console.log("Hello")
    //this.service.postProduct("http://localhost:3004/categories",this.add_categories).subscribe();

    this.formData.append("name",this.add_categories.name);
    this.formData.append("image", this.add_categories.icons);
    this.service.postCategory(this.formData).subscribe();


  }
  }

