import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl ="http://localhost:8080/api/employee"


  constructor(private httpClient : HttpClient) {}

  getEmployeeById(id:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/employees/${id}`, {
      headers: this.createHeaders()
    });
  }

  updateEmployee(id:number , employee :any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/employees/${id}`, employee, {
      headers: this.createHeaders()
    });
  }

  ///////////////////////  Tasks ////////////////////////////////

  getTasksByEmpId():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/tasks`, {
      headers: this.createHeaders()
    });
  }

  getTaskById(id:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/task/${id}` ,{
      headers: this.createHeaders()
    })
  }

  upateTaskStatus(id:number , status :string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/task/${id}/${status}`, {
      headers: this.createHeaders()
    });
  }

  updateTask(id:number , taskDto :any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/task/${id}` , taskDto ,{
      headers:this.createHeaders()
    })
  }


  //////////////////////  Comments ///////////////////////

createComment(taskId:number , content:string):Observable<any>{

  const params ={
    content:content
  }
  return this.httpClient.post(`${this.baseUrl}/task/comment/${taskId}` , null,{
    params: params,
    headers:this.createHeaders()
  })
}

getAllCommentsOfTask(id:number):Observable<any>{
  return this.httpClient.get(`${this.baseUrl}/comments/${id}` ,{
    headers: this.createHeaders()
  })
}



  private createHeaders():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization" , "Bearer "+StorageService.getToken());
    }



    
}
