import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';


const routes: Routes = [
  {path:'', component:MainScreenComponent},
  {path:'categories/:category',component:MainScreenComponent},
  {path:'admin',loadChildren:'./admins/admins.module#AdminsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
