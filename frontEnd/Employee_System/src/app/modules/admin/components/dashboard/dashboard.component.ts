import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../employee';
import { SearchPipe } from "../../../../pipes/search.pipe";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchPipe ,FormsModule,NzLayoutModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  employees:Employee []=[];
  search:string='';
  
  
  constructor(private adminService :AdminService
    , private router :Router
    , private snackbar : MatSnackBar
  ){
    this.getAllEmployees();
   }
  
  
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){

    this.adminService.getAllEmployees().subscribe((res)=>{
      console.log(res);
      this.employees=res;
    })
  }


  updateEmployee(id:number ){
    this.router.navigateByUrl(`/admin/updateEmployee/${id}`).then(
      val =>{console.log(val)},
      error =>{console.log(error)}
    )
  }

  
  deleteEmployee(id:number){
    console.log(id)
    this.adminService.deleteEmployee(id).subscribe((res)=>{
      console.log(res);
      this.getAllEmployees();
      this.snackbar.open("Employee deleted Successfully ..." , "Close" ,{duration:5000})
      
    })
    

  }


  viewEmployee(id:number){
    this.router.navigateByUrl(`/admin/viewEmployee/${id}`)
  }

logout(){
    StorageService.logout();

    this.router.navigateByUrl("signup");
  }


}
