import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit{

  id! : any ;
  updateTaskForm:FormGroup;
  listOfPriority: any =["low" ,"high" ,"medium"];
  listOfEmps: any=[];

  constructor(private adminServcie:AdminService 
    , private route:ActivatedRoute
     , private snackbar:MatSnackBar
     , private router :Router){
    this.updateTaskForm = new FormGroup({
      empId:new FormControl(null ,[Validators.required]),
      title:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required]),
      date:new FormControl(null,[Validators.required]),
      priority:new FormControl(null,[Validators.required])
    })
  }
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.getTaskById();
    this.getAllEmployees();
  }

  getTaskById(){
    this.adminServcie.getTaskById(this.id).subscribe((res)=>{
      console.log(res)
      this.updateTaskForm.patchValue(res)
    })
  }

  getAllEmployees(){
    this.adminServcie.getAllEmployees().subscribe((res)=>{
      console.log(res)
      this.listOfEmps=res;

    })
  }

  update(){

    this.adminServcie.updateTask(this.id , this.updateTaskForm.value).subscribe((res)=>{

      console.log(res)
      if(res.id != null){
        this.snackbar.open("Task Updated Successfully .." ,"Close" , {duration:5000})
        this.router.navigateByUrl("/admin/showTasks")
      }else{
        this.snackbar.open("something went wrong .." ,"Close" , {duration:5000})
      }

    })

  }

}
