import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { StorageService } from '../../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule,MatCardModule,NzInputModule,NzFormModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit{


  id!:number;

  taskDetails :any =[];
  contentForm: any;
  comments:any;

  constructor(private employeeService:EmployeeService
    , private route:ActivatedRoute
    ,private snackbar:MatSnackBar
    ,private storageService:StorageService
  ){ }


  ngOnInit(): void {
    this.contentForm= new FormGroup({
      content: new FormControl(null)
    })
    this.id=this.route.snapshot.params["id"]
    this.getTaskById()
    this.getAllComments()
  }

  getTaskById(){
    this.employeeService.getTaskById(this.id).subscribe((res)=>{
      console.log(res)
      this.taskDetails =res
    
    })
  }


  getUserRole():string{
    return StorageService.getUserRole().toLocaleLowerCase();
  }

  publish(){
    this.employeeService
    .createComment(this.id , this.contentForm.get('content')?.value)
    .subscribe((res)=>{
      console.log(this.contentForm.get('content')?.value)
      console.log(res)
        
      if(res.id != null){
        this.snackbar.open("Comment posted Successfully ..." ,"Close" ,{duration:5000})
        this.getAllComments();
      }else{
        this.snackbar.open("Something went wrong ..." ,"Close" ,{duration:5000})

      }
    })
  }


  getAllComments(){
    this.employeeService.getAllCommentsOfTask(this.id).subscribe((res)=>{
      console.log(res)
      this.comments=res
    })
  }
  

}
