import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,
   FormsModule,MatCardModule,NzInputModule,NzFormModule
  
  ],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit{

  id!:number ;
  taskDetails : any =[];
  comments:any;
  conentForm!: FormGroup;

  constructor(private adminService:AdminService
        , private route :ActivatedRoute
      , private snackbar:MatSnackBar){
          this.id = this.route.snapshot.params["id"]
          this.getTaskById()
  }


  ngOnInit(): void {
    this.conentForm = new FormGroup({
      content : new FormControl(null , [Validators.required])
    })
    this.getAllComments()
  }

  getTaskById(){
    this.adminService.getTaskById(this.id).subscribe((res)=>{
      console.log(res)
      this.taskDetails = res
    })
  }

  publish(){
    this.adminService
    .createComment(this.id , this.conentForm.get('content')?.value)
    .subscribe((res)=>{
      console.log(this.conentForm.get('content')?.value)
      console.log(res)

      if(res.id != null){
        this.snackbar.open("Comment posted Successfully ..." ,"Close" ,{duration:5000})
      }else{
        this.snackbar.open("Something went wrong ..." ,"Close" ,{duration:5000})

      }
    })
  }


  getAllComments(){
    this.adminService.getAllCommentsOfTask(this.id).subscribe((res)=>{
      console.log(res)
      this.comments=res
    })
  }

}
