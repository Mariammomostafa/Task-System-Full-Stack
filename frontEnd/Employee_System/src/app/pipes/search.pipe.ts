import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../modules/admin/employee';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(employees:Employee[],name: String): Employee[] {
    return employees.filter(
      (employee) => employee.firstName.toLowerCase().includes(name.toLowerCase())
      || employee.lastName.toLowerCase().includes(name.toLowerCase())
    );
  }

}
