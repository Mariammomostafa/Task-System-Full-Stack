import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Employee} from '../../model/employee';
import {Router, RouterLink} from '@angular/router';
import { EmployeeService } from '../modules/employee/services/employee.service';
import { AdminService } from '../modules/admin/services/admin.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgForOf
    
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

     employees: Employee[] = [];


      constructor(private employeeService: EmployeeService, private adminService:AdminService
      , private router :Router) {

      }

        ngOnInit(): void {
           this.getAllEmployees();
        }

      private getAllEmployees() {
        this.adminService.getAllEmployees()
          .subscribe({ next: (data) => {
              (this.employees = data);
            console.log(data);
          },
          error: (error) => {
            alert('There was an error in retrieving data from the server');
          }
        });
    }


  viewEmployee(id:number){
        this.router.navigate([  `/view-employee/${id}`  ])
          .then(nav =>{
            console.log(nav)
          },
            error =>{
            console.log(error)
            });
  }



  updateEmployee(id: number){
      this.router.navigate([`/update-employee/${id}`])
        .then(nav => {
          console.log(nav)
        },
          error =>{
            console.log(error)
          });
  }



  deleteEmployee(id:number){

    this.adminService.deleteEmployee(id)
      .subscribe({next : (data) =>{
          this.getAllEmployees();
        }, error :(err) =>{
          console.log(err)
        }
      });
  }
}
