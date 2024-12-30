import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../modules/admin/task';

@Pipe({
  name: 'searchtask',
  standalone: true
})
export class SearchtaskPipe implements PipeTransform {

  transform(tasks:Task[],name :String): Task[] {
   
    return tasks.filter(
      (task) => task.title.toLowerCase().includes(name.toLowerCase())
      || task.empName.toLowerCase().includes(name.toLowerCase())
    );

  }
}
