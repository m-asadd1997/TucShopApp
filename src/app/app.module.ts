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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AdminDashboardComponent } from './admins/admin-dashboard/admin-dashboard.component';
import { ChartistModule } from 'ng-chartist';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AuthGuard } from './auth.guard';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
 
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    ProductListingComponent,
    CheckoutComponent,
    LoginPageComponent,

    RecentTransactionsComponent

     
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzSpinModule,
    NzCardModule,
    NzLayoutModule,
    NzGridModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzModalModule,
    NzMessageModule,
    NzMessageModule,
    NzDatePickerModule,
    NzMenuModule,
    ReactiveFormsModule,
    ChartistModule,
    NzAutocompleteModule,
    NzBadgeModule,
    NzDividerModule
    NzAvatarModule

  ],
  providers: [{ provide: NZ_I18N , useValue: en_US }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
