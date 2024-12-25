import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { EmpUpdateComponent } from './components/emp-update/emp-update.component';
import { EmpViewComponent } from './components/emp-view/emp-view.component';
import { TaskDetailsComponent } from './components/Task/task-details/task-details.component';
import { EmpUpdateTaskComponent } from './components/Task/emp-update-task/emp-update-task.component';

const routes: Routes = [
  {path : "empdashboard" , component:EmpDashboardComponent},
  {path:"updateEmployee/:id" , component:EmpUpdateComponent},
  {path:"viewEmployee/:id" , component:EmpViewComponent},
  {path:"taskDetails/:id" , component:TaskDetailsComponent},
  {path:"update-task/:id" , component:EmpUpdateTaskComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
