import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-emp-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './emp-update.component.html',
  styleUrl: './emp-update.component.css'
})
export class EmpUpdateComponent implements  OnInit{

  updateForm!:FormGroup;
  empId!:number;

  constructor(private route :ActivatedRoute 
    , private empService:EmployeeService
    , private snackbar :MatSnackBar
    , private router:Router
  ){

    this.updateForm = new FormGroup({

      firstName:new FormControl(null),
      lastName:new FormControl(null),
      email:new FormControl(null),
      password:new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['id'];
    console.log("empId: "+ this.empId)
    this.getEmployeeById();
  }

  getEmployeeById(){
    this.empService.getEmployeeById(this.empId).subscribe((res)=>{
      console.log(res)
      this.updateForm.patchValue(res);
    })
  }

  update(){
    this.empService.updateEmployee(this.empId , this.updateForm.value).subscribe((res)=>{
      console.log(res)
      if(res.id != null){
         this.snackbar.open("Employee Updated Successfully ..." , "Close" , {duration :5000})
         this.router.navigateByUrl("/admin/dashboard")
      }else{
        this.snackbar.open("Updating Failed , Something went wrong ..." , "Close" , {duration :5000})

      }
    })
  }



}
