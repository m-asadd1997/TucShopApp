import { Component, OnInit } from '@angular/core';
import { MainscreenService } from './mainscreen.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  CollapsedNav = true;
  categoriesArray = [] = [];
  isVisible :Boolean;
  constructor(private mainScreenServ: MainscreenService,private activeRoute:ActivatedRoute, private router: Router) { }

  ngOnInit() {

  //  this.activeRoute.paramMap.subscribe(
  //     params=> {
  //         console.log("params",params['params'].category)
  //     }
  //  );

    this.getCat();
  }

  getCat(){
    this.mainScreenServ.getCategories().subscribe(d=>{
      this.categoriesArray = d;
      console.log("hello",this.categoriesArray)
    })
  }

  addCategoryToUrl(urlFilterWithCatName: String){
    this.router.navigate(["categories/"+urlFilterWithCatName]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
