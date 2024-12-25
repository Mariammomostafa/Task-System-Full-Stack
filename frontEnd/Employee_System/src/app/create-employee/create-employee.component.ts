import { Component } from '@angular/core';
import {Employee} from '../../model/employee';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../modules/admin/services/admin.service';
import { AuthService } from '../auth/services/auth/auth.service';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  employee:Employee=new Employee();


  constructor(private authService:AuthService ,
              private router :Router) {
  }

  saveEmployee(){
    this.authService.signup(this.employee)
      .subscribe({
        next:( data) => {
          console.log(data);
          this.goToEmployeeList();
        },
        error: (error) => {
          alert('There was an error in retrieving data from the server');
        }

      });
  }

  goToEmployeeList(){
    this.router.navigate(["/employees"])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }


  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

}
