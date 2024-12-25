import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.css'
})
export class PostTaskComponent implements OnInit{

  taskForm!:FormGroup;
  listOfEmps:any=[];
  listOfPriority:any=["low","medium","high"];

  constructor(private adminService:AdminService){}
  
  
  ngOnInit(): void {
    this.getAllEmployees()
    this.taskForm = new FormGroup({
      empId:new FormControl(null ,[Validators.required]),
      title:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required]),
      date:new FormControl(null,[Validators.required]),
      priority:new FormControl(null,[Validators.required])
    })
  }



  getAllEmployees(){
    this.adminService.getAllEmployees().subscribe((res)=>{
      console.log(res)
      this.listOfEmps=res
    })
  }

  submit(){
    this.adminService.createTask(this.taskForm.value).subscribe((res)=>{
      console.log(res)
    })
  }

}
