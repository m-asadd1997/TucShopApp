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


const routes: Routes = [
  {path:'',component:LoginPageComponent},
  {path:'layout',component:AdminLayoutComponent, 
  children:  [
       {path: 'product', component:ListProductsComponent },
       {path: 'add-product',component: ProductAddComponent},
       {path: 'add-product/:id', component: ProductAddComponent },
       {path: 'category', component: CategoryListingComponent},
       {path: 'add-category', component: AddCategoryComponent},
       {path: 'add-category/:id', component: AddCategoryComponent},
       {path: 'transactions', component: TransactionsComponent},
       {path: 'user', component: UserComponent}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
