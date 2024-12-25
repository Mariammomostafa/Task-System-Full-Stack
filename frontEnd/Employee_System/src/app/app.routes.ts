import {  Routes } from '@angular/router';
import {  NgModule } from '@angular/core';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';




export const routes: Routes = [
  {path:"" , redirectTo:"welcome" , pathMatch:"full"},
  {path:"welcome" ,  component:WelcomeComponent , title:"Welcome"},
  { path:"employees", component:EmployeeListComponent ,title:"employees"},
  {path:"create-employee", component:CreateEmployeeComponent ,title:"Create Employee"},
  { path:"employees", component:EmployeeListComponent ,pathMatch:"full",title:"Welcome"},
  {path : "login" , component:LoginComponent,title:"Login"},
  {path :"signup" , component:SignupComponent,title:"Signup"},
  {path:"admin" , loadChildren:()=> import("./modules/admin/admin.module").then(e => e.AdminModule)},
  {path:"employee" , loadChildren:()=>import("./modules/employee/employee.module").then(e=>e.EmployeeModule)},



  {path:"**" , component: NotFoundComponent , title:"Not Found"}
];

