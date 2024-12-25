import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

//const BASE_URL ="http://localhost:8080/api/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

private baseUrl ="http://localhost:8080/api/admin"

  constructor(private httpClient : HttpClient) { }

  getAllEmployees():Observable<any>{

    return this.httpClient.get(`${this.baseUrl}/employees`,{
      headers: this.createHeaders()
      });
  }

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

  deleteEmployee(id:number):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/employees/${id}` ,{
      headers: this.createHeaders()
    })
  }

  /**************  Task ********************* */


  createTask(taskDto:any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/task` , taskDto ,{
      headers:this.createHeaders()
    })
  }

  getTaskById(id:number):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/task/${id}`, {
      headers: this.createHeaders()
    });
  }


  getAllTasks():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/tasks` ,{
      headers:this.createHeaders()
    })
  }

  updateTask(id:number , taskDto :any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/task/${id}` , taskDto ,{
      headers:this.createHeaders()
    })
  }

  deleteTask(id:number){
    return this.httpClient.delete(`${this.baseUrl}/task/${id}` ,{
      headers:this.createHeaders()
    })
  }

  //////////////////// Comments /////////////////

  createComment(id :number , content: string):Observable<any>{
    const params ={
      content : content
    }
  return this.httpClient.post(`${this.baseUrl}/task/comment/${id}` , null,{
    params : params ,
    headers: this.createHeaders()
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
    