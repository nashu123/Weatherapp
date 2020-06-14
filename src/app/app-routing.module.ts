import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {path:'',redirectTo:'main',pathMatch:'full'},
  {path:'home' ,component:HomeComponent},
  {path:'main' ,component:MainComponent},
  {path:'**', component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
