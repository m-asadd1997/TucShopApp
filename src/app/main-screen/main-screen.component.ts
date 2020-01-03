import { Component, OnInit } from '@angular/core';
import { MainscreenService } from './mainscreen.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  collapsedVar = true;
  categoriesArray = [] = [];
  constructor(private mainScreenServ: MainscreenService) { }

  ngOnInit() {
    this.getCat();
  }

  getCat(){
    this.mainScreenServ.getCategories().subscribe(d=>{
      this.categoriesArray = d;
      console.log("hello",this.categoriesArray)
    })
  }

  
}
