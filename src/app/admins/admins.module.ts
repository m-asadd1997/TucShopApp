import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US, NzFormModule, NzTableModule, NzDropDownModule, NzLayoutModule } from 'ng-zorro-antd';
import { ChartistModule } from 'ng-chartist';
import { AdminsRoutingModule } from './admins-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [LoginPageComponent, AdminLayoutComponent, ListProductsComponent, ProductAddComponent, CategoryListingComponent, AddCategoryComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    NgZorroAntdModule,
    NzFormModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
   
    NgZorroAntdModule,
    NzTableModule,
    NzDropDownModule,
    NzFormModule,
    NzLayoutModule,
    ChartistModule
  ]
  ,providers:[AuthGuardService]
})
export class AdminsModule { }
