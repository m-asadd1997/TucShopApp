import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { DeskRequestComponent } from './admins/desk-request/desk-request.component';

const routes: Routes = [
  {path:'',  component:LoginPageComponent},
  {path:'login',  component:LoginPageComponent},
  {path:'main', component:MainScreenComponent, canActivate:[AuthGuard]},
  {path:'categories/:category',component:MainScreenComponent, canActivate:[AuthGuard]},
  {path:'admin', loadChildren:() => import('./admins/admins.module').then(m => m.AdminsModule)},
  //{path:'deskreq', component:DeskRequestComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [

                                  ]
