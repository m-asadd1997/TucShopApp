import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US, NzFormModule, NzTableModule, NzDropDownModule, NzLayoutModule } from 'ng-zorro-antd';
import { ChartistModule } from 'ng-chartist';
import { AdminsRoutingModule } from './admins-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserComponent } from './user/user.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TotalProductsDetailsComponent } from './total-products-details/total-products-details.component';
import { OutOfStockDetailsComponent } from './out-of-stock-details/out-of-stock-details.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { SettingComponent } from './setting/setting.component';
import { from } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ExportAsModule } from 'ngx-export-as';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';

@NgModule({

  declarations: [LoginPageComponent,
                 AdminLayoutComponent,
                 ListProductsComponent,
                 ProductAddComponent,
                 AdminDashboardComponent,
                 CategoryListingComponent,
                 AddCategoryComponent,
                 TransactionsComponent,
                 UserComponent,
                 TotalProductsDetailsComponent,
                 OutOfStockDetailsComponent,
                 TransactionsDetailsComponent,
                 SettingComponent,

                 AdminUserComponent,
                 AddUserComponent,
                 GenerateReportComponent,

                 ],




  imports: [
    CommonModule,
    AdminsRoutingModule,
    NgZorroAntdModule,
    NzFormModule,
    NzButtonModule,
    CommonModule,
    NzSpinModule,
    FormsModule,
    ReactiveFormsModule ,
    ChartistModule,
    NzGridModule,
    NzProgressModule,
    NgZorroAntdModule,
    NzTableModule,
    NzDropDownModule,
    NzFormModule,
    NzLayoutModule,
    ExportAsModule,
    NzSwitchModule,
    FusionChartsModule
  ]
  ,providers:[AuthGuardService]
})
export class AdminsModule { }
