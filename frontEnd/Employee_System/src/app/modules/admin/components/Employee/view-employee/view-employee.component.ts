import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [NzCardModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit{

  id!:number;
  listOfEmps:any=[];

  constructor(private route:ActivatedRoute
    , private adminService : AdminService
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.viewEmployee();
  }

  viewEmployee(){
    this.adminService.getEmployeeById(this.id).subscribe((res)=>{
      console.log(res)
      this.listOfEmps=res;

    })
  }

}
