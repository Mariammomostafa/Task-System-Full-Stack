import { NzButtonSize } from './../../../../../../../node_modules/ng-zorro-antd/button/button.component.d';
import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule} from 'ng-zorro-antd/button';
import { Task } from '../../../task';
import { FormsModule } from '@angular/forms';
import { SearchtaskPipe } from "../../../../../pipes/searchtask.pipe";

@Component({
  selector: 'app-show-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, NzCardModule, NzIconModule,
    NzAvatarModule, NzButtonModule, FormsModule, SearchtaskPipe],
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.css'
})
export class ShowTasksComponent {

  listOfTasks:Task[]=[];
  search:string='';

  constructor(private adminService:AdminService){
    this.getAllTasks()
  }


  getAllTasks(){
    this.adminService.getAllTasks().subscribe((res)=>{
      console.log(res)
      if(res?.length){
        this.listOfTasks=res
      }
     
    })
  }


  delete(id:number){
    this.adminService.deleteTask(id).subscribe((res)=>{
      console.log(res)
      this.getAllTasks()
    })
  }

}
