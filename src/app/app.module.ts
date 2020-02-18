import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginPageComponent } from './login-page/login-page.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ListProductsComponent } from './admins/list-products/list-products.component';
import { ProductAddComponent } from './admins/product-add/product-add.component';
import { AdminLayoutComponent } from './admins/admin-layout/admin-layout.component';
import { AddCategoryComponent } from './admins/add-category/add-category.component';
import { CategoryListingComponent } from './admins/category-listing/category-listing.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    ProductListingComponent,
    CheckoutComponent,
    LoginPageComponent,
    // ListProductsComponent,
    // ProductAddComponent,
    // AdminLayoutComponent,
    // AddCategoryComponent,
    // CategoryListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzLayoutModule,
    NzGridModule,
    NzPopoverModule,
    NzModalModule,
    NzMessageModule,
    NzMenuModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
