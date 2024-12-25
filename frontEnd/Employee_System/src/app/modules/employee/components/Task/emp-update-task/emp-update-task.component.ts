import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/employee.service';
import { StorageService } from '../../../../../auth/services/storage/storage.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

type Priority ='low' | 'medium' | 'high';

@Component({
  selector: 'app-emp-update-task',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NzSelectModule,NzInputModule,NzFormModule,NzButtonModule],
  templateUrl: './emp-update-task.component.html',
  styleUrl: './emp-update-task.component.css'
})
export class EmpUpdateTaskComponent implements OnInit{
[x: string]: any;
  private destroy$ = new Subject<void>();

  id! : any ;
  selectedValue = null;
  updateTaskForm:FormGroup;
  listOfPriority =[{name:"low"},
    {name:"medium"},
    {name:"high"},
     ];
  
  constructor(private employeeService:EmployeeService 
    ,private fb:FormBuilder
    , private route:ActivatedRoute
     , private snackbar:MatSnackBar
     , private router :Router){
    this.updateTaskForm = new FormGroup({
      empId:this.fb.control<string|null>(null ,[Validators.required]),
      title:this.fb.control<string|null>(null,[Validators.required]),
      description:this.fb.control<string|null>(null,[Validators.required]),
      date:this.fb.control<string|null>(null,[Validators.required]),
      priority:this.fb.control<string|null>(null,[Validators.required])
    })
  }
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.getTaskById();

    this.updateTaskForm.controls['priority'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      console.log(value);
    });
    
  }


  
  getTaskById(){
    this.employeeService.getTaskById(this.id).subscribe((res)=>{
      console.log(res)
      this.updateTaskForm.patchValue(res)
    })
  }

  getEmpId():string{
    return StorageService.getUserId().toString()
  }

  update(){

   console.log(this.updateTaskForm.get('priority')?.value);
   console.log(this.updateTaskForm.value);
   
    this.employeeService.updateTask(this.id , this.updateTaskForm.value).subscribe((res)=>{

      console.log(res)
      if(res.id != null){
        this.snackbar.open("Task Updated Successfully .." ,"Close" , {duration:5000})
        this.router.navigateByUrl("/employee/empdashboard")
      }else{
        this.snackbar.open("something went wrong .." ,"Close" , {duration:5000})
      }

    })

  }

}
