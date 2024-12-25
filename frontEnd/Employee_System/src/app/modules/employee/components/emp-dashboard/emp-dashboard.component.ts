import { Component } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule,FormsModule ,RouterLink],
  templateUrl: './emp-dashboard.component.html',
  styleUrl: './emp-dashboard.component.css'
})
export class EmpDashboardComponent {

  listOfTasks:any=[];

  constructor(private empService:EmployeeService
    , private snackbar :MatSnackBar
  ){
    this.getAllTasksByEmpId()
  }

  getAllTasksByEmpId(){
    this.empService.getTasksByEmpId().subscribe((res)=>{
      console.log(res)
      this.listOfTasks = res
    })
  }

  updateTask(id:number,status:string){

    this.empService.upateTaskStatus(id,status).subscribe((res)=>{
      console.log(res)
      if(res.id != null){
        this.snackbar.open("Task Status updated Successfully .." ,"Close" ,{duration:5000})
        this.getAllTasksByEmpId()
      }else{
        this.snackbar.open("Somthing went wrong .." ,"Close" ,{duration:5000})

      }
      
    })
  }

}
