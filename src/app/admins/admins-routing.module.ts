import { AuthGuardService } from './auth-guard.service';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserComponent } from './user/user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TotalProductsDetailsComponent } from './total-products-details/total-products-details.component';
import { OutOfStockDetailsComponent } from './out-of-stock-details/out-of-stock-details.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { SettingComponent } from './setting/setting.component';
import { DeskRequestComponent } from './desk-request/desk-request.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  {path:'home',loadChildren:() => import('./../app.module').then(m => m.AppModule), canActivate:[AuthGuardService]},
  {
    path: 'layout', component: AdminLayoutComponent,canActivate:[AuthGuardService],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'product', component: ListProductsComponent },
      { path: 'add-product', component: ProductAddComponent },
      { path: 'add-product/:id', component: ProductAddComponent },
      { path: 'category', component: CategoryListingComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'add-category/:id', component: AddCategoryComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'user', component: UserComponent },
      {path:'userlist/:user',component:UserComponent},
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'setting', component: SettingComponent},
      { path: 'totalproddetails', component: TotalProductsDetailsComponent },
      {path:'outOfstockdetail',component:OutOfStockDetailsComponent},
      {path:'transactiondetail',component:TransactionsDetailsComponent},
      

    ]
    
  },
  {path:'deskrequest', component:DeskRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
