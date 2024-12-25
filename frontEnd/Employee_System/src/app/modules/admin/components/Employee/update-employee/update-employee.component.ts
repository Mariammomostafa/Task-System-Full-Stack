import { AdminService } from '../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [ReactiveFormsModule,NzLayoutModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit{

  updateForm!:FormGroup;
  empId!:number;

  constructor(private route :ActivatedRoute 
    , private adminService:AdminService
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
    this.adminService.getEmployeeById(this.empId).subscribe((res)=>{
      console.log(res)
      this.updateForm.patchValue(res);
    })
  }

  update(){
    this.adminService.updateEmployee(this.empId , this.updateForm.value).subscribe((res)=>{
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
