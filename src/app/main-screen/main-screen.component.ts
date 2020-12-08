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



  userName
  constructor(private mainScreenServ: MainscreenService,private activeRoute:ActivatedRoute, private router: Router) { }
category
  ngOnInit() {
    // this.fullScreen();
    this.innerWidth = window.innerWidth;
    // this.setupMobileView();
    this.userName= sessionStorage.getItem('username');



        this.router.navigate(["categories/products"]);



    this.getCat();

    this.getSubCategories();




  }

  filterProductsBySubCategory(id)
  {

  }

  getSubCategoriesById(id){
   return( this.subCategories.filter(subCategory=>{
      return  (subCategory.parentID==id)
    }))


  }

  subCategories=[]

  getSubCategories(){
    this.mainScreenServ.getSubCategories(0).subscribe((response:any)=>{
      console.log(response);
      this.subCategories= response.result;

    });
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
  navigateBackToLoginPage(){
    this.router.navigate(['login'])
  }
}
