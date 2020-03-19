import { AdminServiceService } from './../admin-service.service';
import { Component, OnInit } from '@angular/core';
import { add_category } from './add_category';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  add_categories:add_category= new add_category();
  form: any;
  id: any;
  
  constructor(private service:AdminServiceService, private activateRoute: ActivatedRoute,private message:NzMessageService) { }

  formData = new FormData();
  
  handleCategoryBanner(file:FileList){
    this.add_categories.icons=file[0];
    
  }
  
  
  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id)
    this.getCategory();
  }


  submit(myForm:NgForm){
    
    this.formData.append("name",this.add_categories.name);
    this.formData.append("image", this.add_categories.icons);
    if(this.id!=null){
      this.service.updateCategory(this.id,this.formData).subscribe(d=>{
        this.message.success("Updated Successfully",{nzDuration:3000});
      });
      myForm.reset();
      this.formData.delete("name");
      
      this.formData.delete("image");
      

    }

    else {
      
      this.service.postCategory(this.formData).subscribe(d=>{
        this.message.success("Added Successfully",{nzDuration:3000});
      });
      myForm.reset();
      this.formData.delete("name");
      
      this.formData.delete("image");
      
        }
      
}

getCategory(){
  this.service.getCategoryById(this.id).subscribe(d=>{
  this.add_categories.name = d.name
  this.add_categories.icons = d.image
  
})
}


isInputValid(form){
  if(form.valid&&this.add_categories.icons)
  {
    return false;
  }
  else{
    return true;
  }
}

}

