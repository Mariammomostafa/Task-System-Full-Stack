import { Component, Input } from '@angular/core';
import { AdminService } from '../modules/admin/services/admin.service';
import { Employee } from '../modules/admin/employee';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth/auth.service';
import { StorageService } from '../auth/services/storage/storage.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
 
  employee:any =[];
  name : string ='';
  

  constructor(private authService:AuthService , private router:Router){
    this.authService.getEmpFromToken().subscribe((res)=>{
      console.log(res);
      
      this.employee=res
      console.log(this.employee.firstName);

    })
  }

  updateEmployee(id:number){

    if(StorageService.isAdminLogged()){
      this.router.navigateByUrl(`/admin/updateEmployee/${id}`).then(
        val =>{console.log(val)},
        error =>{console.log(error)}
      )
    }else if(StorageService.isEmployeeLogged()){
      this.router.navigateByUrl(`/employee/updateEmployee/${id}`)
    }

    
  }

  viewEmployee(id:number){
    this.router.navigateByUrl(`/admin/viewEmployee/${id}`).then(
      val =>{console.log(val)},
      error =>{console.log(error)}
    )
  }



}
