import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {path:'',  component:LoginPageComponent},
  {path:'main', component:MainScreenComponent},
  {path:'categories/:category',component:MainScreenComponent},
  {path:'admin', loadChildren:'./admins/admins.module#AdminsModule'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [

                                  ]
