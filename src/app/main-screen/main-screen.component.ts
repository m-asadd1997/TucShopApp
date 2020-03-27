import { Component, OnInit, HostListener } from '@angular/core';
import { MainscreenService } from './mainscreen.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  public innerWidth: any;
  // mobileView = true;
  CollapsedNav = true;
  categoriesArray = [] = [];
  isVisible :Boolean;
  isCollapsed; 
  
  
 
  
  constructor(private mainScreenServ: MainscreenService,private activeRoute:ActivatedRoute, private router: Router) { }
category
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    // this.setupMobileView();

    // this.activeRoute.paramMap.subscribe(
    //   params => {


    //   this.category= (params['params'].category)
       

      // if(this.category==="products")
      {
        this.router.navigate(["categories/products"]);
      }
     
    //   }
    // );




    
  

    this.getCat();
    
    
    
  }

  getCat(){
    this.mainScreenServ.getCategories().subscribe(d=>{
      this.categoriesArray = d;
      
      

     
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
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.innerWidth = window.innerWidth;
  //   console.log(this.innerWidth)
  //   this.setupMobileView()
// }
  

  // setupMobileView(){
  //   this.mobileView = this.innerWidth <= 900?false:true;
  // }
}
