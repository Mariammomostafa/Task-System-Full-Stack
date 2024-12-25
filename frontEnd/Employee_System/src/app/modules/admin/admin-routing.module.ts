import { UpdateEmployeeComponent } from './components/Employee/update-employee/update-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewEmployeeComponent } from './components/Employee/view-employee/view-employee.component';
import { PostTaskComponent } from './components/Task/post-task/post-task.component';
import { ShowTasksComponent } from './components/Task/show-tasks/show-tasks.component';
import { UpdateTaskComponent } from './components/Task/update-task/update-task.component';
import { ViewTaskComponent } from './components/Task/view-task/view-task.component';

const routes: Routes = [
  {path : "dashboard" , component:DashboardComponent},
  {path:"updateEmployee/:id" , component:UpdateEmployeeComponent},
  {path:"viewEmployee/:id" , component:ViewEmployeeComponent},
  {path:"task" , component:PostTaskComponent},
  {path:"showTasks" , component:ShowTasksComponent},
  {path:"updateTask/:id" , component:UpdateTaskComponent},
  {path:"ViewTask/:id" , component:ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
